"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { updateName } from "./actions";
import toast from "react-hot-toast";

export default function NameForm({
  userId,
  initialName,
}: {
  userId: string;
  initialName: string;
}) {
  const updateNameWithId = updateName.bind(null, userId);
  const [name, setName] = useState(initialName);
  const debouncedName = useDebounce(name, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (initialName == debouncedName) return;
    const myPromise = updateNameWithId(debouncedName);
    toast.promise(myPromise, {
      loading: "ニックネームを更新中...",
      success: "ニックネームを更新しました",
      error: "ニックネームを更新できませんでした",
    });
  }, [debouncedName]);

  return (
    <div className="grid place-items-center m-2">
      <Input
        type="text"
        value={name}
        onChange={handleChange}
        className="w-fit text-center text-lg"
        placeholder="ニックネーム"
      />
    </div>
  );
}
