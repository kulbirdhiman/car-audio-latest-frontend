"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { useEffect, useRef } from "react";
import axios from "axios";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  PhotoIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  LinkIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import "./RichTextEditor.css"; // Import CSS for correct list styling

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.extend({
        addAttributes() {
          return {
            src: { default: null },
            alt: { default: "" }, // Add alt attribute support
          };
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      BulletList,
      OrderedList,
      TaskList,
      TaskItem,
      ListItem,
    ],
    content: value || "<p>Start typing...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Ensure editor updates when the value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ADDRESS}/v1/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        const imageUrl = response.data.data.url;
        console.log("imageUrl",response.data.data.data.key);
        
        const cloudFrontUrl = `${process.env.NEXT_PUBLIC_S3_IMG_URL}${response.data.data.data.key}`;


        const altText =
          prompt("Enter alt text for the image:") || "Uploaded Image";

        editor?.chain().focus().setImage({ src: cloudFrontUrl, alt: altText }).run();
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    }
  };

  const addLink = () => {
    const title = prompt("Enter the link text:");
    if (!title) return;

    const url = prompt("Enter the link URL:");
    if (!url) return;

    editor
      ?.chain()
      .focus()
      .insertContent(`<a href="${url}" target="_blank">${title}</a>`)
      .insertContent(" ")
      .unsetLink()
      .run();

    editor?.commands.focus();
  };

  const removeLink = () => {
    editor?.chain().focus().unsetLink().run();
  };

  if (!editor) return <div>Loading Editor...</div>;

  return (
    <div className="border rounded-lg p-4">
      {/* Toolbar */}
      <div className="flex space-x-2 border-b pb-2">
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 ${
            editor.isActive("bold") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <BoldIcon className="h-5 w-5" />
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 ${
            editor.isActive("italic") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <ItalicIcon className="h-5 w-5" />
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 ${
            editor.isActive("strike") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <StrikethroughIcon className="h-5 w-5" />
        </button>
        <button  type="button" onClick={() => fileInputRef.current?.click()} className="p-2">
          <PhotoIcon className="h-5 w-5" />
        </button>
        <button
         type="button"
          onClick={addLink}
          className={`p-2 ${
            editor.isActive("link") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <LinkIcon className="h-5 w-5" />
        </button>
        <button type="button" onClick={removeLink} className="p-2 text-red-500">
          ✖
        </button>

        {/* Ordered List */}
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 ${
            editor.isActive("orderedList") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <Bars3BottomRightIcon className="h-5 w-5" />
        </button>

        {/* Unordered List */}
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 ${
            editor.isActive("bulletList") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <Bars3BottomLeftIcon className="h-5 w-5" />
        </button>

        {/* Task List (Checkable List) */}
        <button
         type="button"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`p-2 ${
            editor.isActive("taskList") ? "bg-gray-300 rounded" : ""
          }`}
        >
          <CheckIcon className="h-5 w-5" />
        </button>

        <button
         type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2"
        >
          <ArrowUturnLeftIcon className="h-5 w-5" />
        </button>
        <button
         type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2"
        >
          <ArrowUturnRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="editor-content min-h-[150px] p-2 border-black border mt-2"
      />
    </div>
  );
};

export default RichTextEditor;
