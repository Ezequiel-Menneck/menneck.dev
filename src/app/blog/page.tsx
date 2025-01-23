import fs from "fs";
import { marked } from "marked";
import Link from "next/link";
import path from "path";

export default function Blog() {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    console.log(filename.split("&"));
    return {
      content: marked.parse(fileContents),
      title: filename.split("&")[0].replace(".md", "").replace(/%3F/g, "?"), // Decodifica o caractere ?
      slug: encodeURIComponent(filename.replace(".md", "").replace(/ /g, "-")), // Codifica o slug
      date: filename.split("&")[1].replaceAll("-", "/").replace(".md", ""),
    };
  });

  return (
    <section className="flex flex-col justify-center items-center w-screen">
      <div className="mb-10 max-w-4xl w-full">
        <h1 className="text-6xl font-bold mb-24">Blog</h1>

        {posts.map((post, index) => (
          <div key={index} className="mb-6 flex items-center justify-between">
            <Link href={`/blog/${post.slug}`} className="font-bold text-3xl">
              {post.title.replaceAll("-", " ")}
            </Link>
            <div>{post.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
