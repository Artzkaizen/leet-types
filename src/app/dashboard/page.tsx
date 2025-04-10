"use client";
import Editor from "@monaco-editor/react";

export default function Page() {
  return (
    <div className="flex h-svh items-center justify-center">
      <Editor height="90vh" defaultLanguage="typescript" />
    </div>
  );
}
