"use client";

import React, { useEffect, useOptimistic, useRef, useState } from "react";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import Japanese from "@uppy/locales/lib/ja_JP";
// import Transloadit from "@uppy/transloadit";
import Tus from "@uppy/tus";
// import RemoteSources from "@uppy/remote-sources";
// import GoldenRetriever from "@uppy/golden-retriever";
import Compressor from "@uppy/compressor";

// Don't forget the CSS: core and the UI components + plugins you are using.
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import { ImagePlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { revalidateTag } from "next/cache";
// import { getRevalidateTags } from "@/app/(profile)/get-profile-by-userId";
import { updateAvatar } from "../actions";
import { nanoid } from "nanoid";
import { Skeleton } from "../../../../../components/ui/skeleton";
import Image from "next/image";
import Avatar from "./avatar";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useEffectOnce } from "usehooks-ts";

// import { COMPANION_URL, COMPANION_ALLOWED_HOSTS } from "@uppy/transloadit";
const bucketName = "avatars";
// Don’t forget to keep the Uppy instance outside of your component.
const uppy = new Uppy({
  locale: Japanese,
  restrictions: {
    allowedFileTypes: ["image/*"],
    maxNumberOfFiles: 1,
    maxFileSize: 10485760, // 10MB
  },
  //   debug: true,
  //   autoProceed: true,
  allowMultipleUploadBatches: false,
})
  .use(ImageEditor, {
    cropperOptions: {
      croppedCanvasOptions: {},
      aspectRatio: 1,
    },
  })
  .use(Tus, {
    endpoint: `${process.env
      .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/upload/resumable`,
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      "x-upsert": "true",
    },
    chunkSize: 6 * 1024 * 1024,
    allowedMetaFields: [
      "bucketName",
      "objectName",
      "contentType",
      "cacheControl",
    ],
    uploadDataDuringCreation: true,
    removeFingerprintOnSuccess: true,
  })
  //   .use(Transloadit, {
  //     assemblyOptions: {
  //       params: {
  //         auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_KEY! },
  //         template_id: "1aea78abb32b46bb991464de3320aa3c",
  //       },
  //     },
  //     // importFromUploadURLs: true,
  //   })
  //   .use(RemoteSources, {
  //     companionUrl: COMPANION_URL,
  //   })
  //   .use(GoldenRetriever)
  .use(Compressor);
//   .on("error", (error) => {
//     console.error(error);
//   });

export function AvatarForm({
  userId,
  avatarUrl,
}: {
  userId: string;
  avatarUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const updateAvatarWithId = updateAvatar.bind(null, userId);
  const [optimisticAvatarUrl, setOptimisticAvatarUrl] = useState(avatarUrl);

  useEffectOnce(() => {
    uppy
      .on("file-added", (file) => {
        const fileName = `${nanoid()}.${file.extension}`;
        file.meta = {
          ...file.meta,
          bucketName,
          objectName: `${userId}/${fileName}`,
          contentType: file.type,
        };
      })
      .on("upload-success", (file, response) => {
        setOptimisticAvatarUrl(URL.createObjectURL(file?.data!));
        const myPromise = updateAvatarWithId(
          (file?.meta?.objectName as string).split("/")[1]
        );
        toast.promise(myPromise, {
          loading: "アバターを更新中...",
          success: "アバターを更新しました",
          error: "アバターを更新できませんでした",
        });
      });
    // .on("complete", async (result) => {
    //   const formData = new FormData();
    //   formData.append("userId", userId);
    //   formData.append("fileName", fileName);
    //   await updateAvatarUrl(formData);
    // });
  });

  const supabase = createClient();
  const accessToken = useAccessToken(supabase);
  useEffect(() => {
    uppy.getPlugin("Tus")?.setOptions({
      headers: { authorization: `Bearer ${accessToken}` },
    });
  }, [accessToken]);

  return (
    <section className="grid place-items-center m-2">
      <Avatar
        handleClick={() => setOpen(true)}
        avatarUrl={optimisticAvatarUrl || "undefined"}
      />

      <DashboardModal
        uppy={uppy}
        open={open}
        onRequestClose={() => {
          uppy.cancelAll();
          setOpen(false);
        }}
        //   theme="auto"
        autoOpenFileEditor
        showProgressDetails
        closeAfterFinish
        closeModalOnClickOutside
        proudlyDisplayPoweredByUppy={false}
        //   showSelectedFiles={false}
      />
    </section>
  );
}

const useAccessToken = (supabase: ReturnType<typeof createClient>) => {
  const [accessToken, setAccessToken] = useState<string>("");
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) redirect("/login");
      setAccessToken(session.access_token);
    });
  }, [supabase]);
  return accessToken;
};
