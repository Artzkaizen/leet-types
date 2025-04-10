import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import "github-markdown-css/github-markdown.css";

const MarkdownRenderer = ({ markdown }: { markdown?: string }) => {
  return (
    <div className="markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img className="inline-block" {...props} />
          ),
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className ?? "");
            const content =
              typeof children === "string"
                ? children
                : Array.isArray(children)
                  ? children.join("")
                  : "";
            return match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={"typescript"}
                PreTag="div"
              >
                {content.replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>{children}</code>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
