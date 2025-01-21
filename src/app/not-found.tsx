import Link from "next/link";

export default function NotFoundGlobal() {
  return (
    <>
      <h1>Not found</h1>
      <Link href={"/"} about="Go to home">
        Go to Home
      </Link>
    </>
  );
}
