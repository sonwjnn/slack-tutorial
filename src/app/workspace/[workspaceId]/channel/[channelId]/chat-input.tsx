import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

type ChatInputProps = {
  placeholder: string;
};

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);

  const handleSubmit = ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    console.log(body, image);
  };

  return (
    <div className="px-5 w-full">
      <Editor
        innerRef={editorRef}
        onSubmit={handleSubmit}
        disabled={false}
        placeholder={placeholder}
      />
    </div>
  );
};
