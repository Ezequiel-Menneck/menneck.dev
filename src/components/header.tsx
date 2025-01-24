"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-5 mb-12">
      <Link
        href={"/"}
        about="Link to home"
        className={`${
          pathname === "/" ? "font-bold text-xl" : "font-normal"
        } text-lg`}
      >
        Home
      </Link>
      <Link
        href={"/blog"}
        about="Link to blog"
        className={`${
          pathname.includes("/blog") ? "font-bold text-xl" : "font-normal"
        } text-lg`}
      >
        Blog
      </Link>
    </nav>
  );
}
