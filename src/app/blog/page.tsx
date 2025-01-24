import fs from "fs";
import Link from "next/link";
import path from "path";

export default function Blog() {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const [dateLine] = fileContents.split("\n");
    const publicationDate = dateLine.trim();

    return {
      title: filename.replace(".md", "").replace(/%3F/g, "?"),
      slug: encodeURIComponent(filename.replace(".md", "").replace(/ /g, "-")),
      date: publicationDate,
    };
  });

  return (
    <section className="w-full">
      <h1 className="text-6xl font-bold mb-24">Blog</h1>

      {posts.map((post, index) => (
        <div key={index} className="mb-6 flex items-center justify-between">
          <Link href={`/blog/${post.slug}`} className="font-bold text-3xl">
            {post.title.replaceAll("-", " ")}
          </Link>
          <div>{post.date}</div>
        </div>
      ))}
    </section>
  );
}
