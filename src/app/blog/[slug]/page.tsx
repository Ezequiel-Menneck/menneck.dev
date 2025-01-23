import fs from "fs";
import { marked } from "marked";
import path from "path";
import styles from "./slug.module.css";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: encodeURIComponent(filename.replace(".md", "").replace(/\?/g, "%3F")), // Encode special characters
  }));
}

async function getPostContent(slug: string) {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const filePath = path.join(
    postsDirectory,
    `${decodeURIComponent(slug.replace(/%3F/g, "?"))}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf8");

  const renderer = new marked.Renderer();

  // Função para adicionar classes
  const addClass = (tag: string, className: string, text: string) => {
    return `<${tag} class="${className}">${text}</${tag}>`;
  };

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((token) => token.raw).join(""); // Concatena o texto dos tokens
    const className = depth === 1 ? styles.h1 : depth === 3 ? styles.h3 : "";
    console.info(text, depth, className);
    return addClass(`h${depth}`, className, text);
  };

  renderer.paragraph = (text) => {
    return addClass("p", styles.paragraph, text.text);
  };

  return marked.parse(fileContents, { renderer });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const content = await getPostContent(params.slug);
  const title = decodeURIComponent(
    params.slug.replace(/-/g, " ").replace(/%3F/g, "?")
  );

  return (
    <section className="flex flex-col justify-center items-center w-screen">
      <h1 className="text-6xl font-bold">{title.split("&")[0]}</h1>
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </section>
  );
}
