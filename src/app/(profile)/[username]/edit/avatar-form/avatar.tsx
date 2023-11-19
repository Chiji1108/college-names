import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function Avatar({
  avatarUrl,
  handleClick,
}: {
  avatarUrl?: string;
  handleClick: () => void;
}) {
  //   const [error, setError] = useState(false);
  return (
    <div className="w-[128px] h-[128px] rounded-full overflow-hidden border-background border-4 relative">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="avatar"
          className="object-cover object-center"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          //   onError={() => setError(true)}
          priority
        />
      ) : (
        <div className="w-full h-full bg-secondary grid place-content-center text-2xl">
          👥
        </div>
      )}

      <div
        className="absolute inset-0 hover:bg-black/50 group text-white transition-colors grid place-content-center cursor-pointer"
        onClick={handleClick}
      >
        <ImagePlus className="w-8 h-8 opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
}
