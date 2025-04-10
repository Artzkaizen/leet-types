import { Editor as MonacoEditor, type Monaco } from "@monaco-editor/react";
import { useRef } from "react";

const Editor = () => {
  const monacoRef = useRef<Monaco>(null);

  function handleEditorDidMount(_: unknown, monaco: Monaco) {
    monacoRef.current = monaco;
  }

  return (
    <MonacoEditor
      line={1}
      theme="vs-dark"
      options={{
        minimap: {
          enabled: false,
        },
      }}
      onMount={handleEditorDidMount}
      defaultLanguage="typescript"
    />
  );
};

export default Editor;
