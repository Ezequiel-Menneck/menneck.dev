"use client"; // Necessário para que este componente seja executado no cliente

import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function GoBackButton({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={clsx("text-black transition", className)}
    >
      {text}
    </button>
  );
}
