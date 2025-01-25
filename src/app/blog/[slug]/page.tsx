import GoBackButton from "@/components/goBackButton";
import fs from "fs";
import { marked } from "marked";
import path from "path";
import styles from "./slug.module.css";

async function getPostContent(originalSlug: string) {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const filePath = path.join(
    postsDirectory,
    `${decodeURIComponent(originalSlug.replace(/%3F/g, "?"))}.md`
  );

  const fileContents = fs.readFileSync(filePath, "utf8");

  const renderer = new marked.Renderer();

  const addClass = (tag: string, className: string, text: string) => {
    return `<${tag} class="${className}">${text}</${tag}>`;
  };

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((token) => token.raw).join("");
    const className = depth === 1 ? styles.h1 : depth === 3 ? styles.h3 : "";
    return addClass(`h${depth}`, className, text);
  };

  renderer.paragraph = (text) => {
    return addClass("p", styles.p, text.text);
  };

  return marked.parse(fileContents, { renderer });
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getPostContent(slug);

  return (
    <section>
      <GoBackButton text="Voltar" className="italic underline text-xl mb-5" />
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <GoBackButton text="Voltar" className="italic underline text-xl mt-5" />
    </section>
  );
}
