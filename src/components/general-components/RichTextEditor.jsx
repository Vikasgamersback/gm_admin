import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import PropTypes from 'prop-types';
import {
  MdFormatStrikethrough,
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import { FaCode } from "react-icons/fa6";
import { BsTextParagraph } from "react-icons/bs";
import { GoHorizontalRule, GoListOrdered } from "react-icons/go";
import { CgArrowsBreakeV } from "react-icons/cg";
import { BiUndo } from "react-icons/bi";
import { LuRedo2 } from "react-icons/lu";
import { GrBlockQuote } from "react-icons/gr";
import { BiCodeBlock } from "react-icons/bi";
import React, { useEffect } from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex space-x-2 border w-full rounded-md  flex-row  px-3 py-3">
        <MdOutlineFormatBold
          size={35}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().toggleBold()}
          className={
            editor.isActive("bold")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />

        <MdOutlineFormatItalic
          size={35}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().toggleItalic()}
          className={
            editor.isActive("italic")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />
        <MdFormatStrikethrough
          size={35}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />

        <FaCode
          size={35}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />

        <BsTextParagraph
          size={35}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        >
          h3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        >
          h4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 })
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        >
          h5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 })
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        >
          h6
        </button>

        <MdOutlineFormatListBulleted
          size={35}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />

        <GoListOrdered
          size={35}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />

        <GrBlockQuote
          size={35}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />
        <BiCodeBlock
          size={35}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock")
              ? " bg-black text-white border px-1 rounded py-1"
              : " border dark:text-white rounded px-1 py-1"
          }
        />

        <GoHorizontalRule
          size={35}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className=" dark:text-white hover:bg-black hover:text-white border px-1 py-1  rounded"
        />

        <CgArrowsBreakeV
          size={35}
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className=" dark:text-white hover:bg-black hover:text-white border px-1 py-1  rounded"
        />

        <BiUndo
          size={35}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className=" dark:text-white hover:bg-black hover:text-white border px-1 py-1  rounded"
        />

        <LuRedo2
          size={35}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className=" dark:text-white hover:bg-black hover:text-white border px-1 py-1  rounded"
        />
      </div>
    </>
  );
};

MenuBar.propTypes = {
  editor: PropTypes.object, 
};

const RichTextEditor = ({ setData, initialContent }) => {
 // console.log(initialContent);
  const editor = useEditor({
    extensions: [StarterKit, Heading, Blockquote],
    content: initialContent,
     
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setData(html);
  
    },
  });
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  return (
    <div  className="px-1 py-2 border  placeholder-red-600 rounded-lg w-full dark:bg-[#242424] dark:border-none outline-none dark:text-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

RichTextEditor.propTypes = {
  setData: PropTypes.func.isRequired, // Add PropTypes for 'setData' prop
};

export default RichTextEditor;
