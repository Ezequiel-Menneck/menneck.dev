import fs from "fs";
import { marked } from "marked";
import path from "path";

export default function Blog() {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return {
      content: marked.parse(fileContents),
      title: filename.replace(".md", ""),
    };
  });

  console.log(posts);

  return (
    <section className="flex flex-col justify-center items-center w-screen">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
    </section>
  );
}
