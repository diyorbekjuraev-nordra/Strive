"use client";
import { AvatarBase, AvatarFallback, AvatarImage } from "@/library/Avatar";
import { Button } from "@/library/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/library/Popover";
import { ScrollArea, ScrollBar } from "@/library/ScrollArea";
import { cn, extractMentions, getInitials } from "@/lib/utils";
import { getDeterministicColor } from "@/lib/color";
import Document from "@tiptap/extension-document";
import Mention from "@tiptap/extension-mention";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AtSign, SmilePlus } from "lucide-react";
import { useState, useCallback, forwardRef, memo } from "react";
import { Markdown } from "tiptap-markdown";
import suggestion from "./suggestions/suggestions";
import { useCommentStore } from "../../store";
import { JSONContent } from "@tiptap/core";
import CharacterCount from "@tiptap/extension-character-count";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@/library/EmojiPicker";
import { TUser } from "@/lib/types/base";

// ----------------------
// Markdown Extension
// ----------------------
const markdownExtension = Markdown.configure({
  html: true,
  tightLists: true,
  tightListClass: "tight",
  bulletListMarker: "-",
  linkify: false,
  breaks: false,
  transformPastedText: false,
  transformCopiedText: false,
});

// ----------------------
// Types
// ----------------------
interface CommentInputProps extends React.HTMLAttributes<HTMLDivElement> {
  user: TUser;
  getAllUsers: (query: string) => Promise<TUser[]>;
  variant?: "default" | "thread";
  onSubmitText?: (T: {
    input: string;
    mentions: string[];
    jsonContent: JSONContent;
  }) => void;
  contentType?: "HTML" | "TEXT" | "MARKDOWN" | "JSON";
  characterLimit?: number;
}

export interface InputRef {
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => boolean;
}

// ----------------------
// Inner Component
// ----------------------
function CommentInput(
  {
    variant = "default",
    contentType = "TEXT",
    getAllUsers,
    user,
    characterLimit = 500,
    ...props
  }: CommentInputProps,
  ref: React.Ref<InputRef>
) {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const { setInput } = useCommentStore();
  const [focused, setFocused] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      markdownExtension,
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: ({ editor }) => (editor.isEmpty ? "Add comment..." : ""),
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "text-[var(--interactive)] ",
        },
        suggestion: {
          ...suggestion,
          items: async ({ query }) => {
            setInput({ isMentionLoading: true });
            const users = await getAllUsers(query);
            setInput({ isMentionLoading: false });
            return users;
          },
        },
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],

    immediatelyRender: true,
    content: null,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  });

  const handleMention = useCallback(() => {
    if (!editor) return;
    editor.commands.focus();
    editor.commands.insertContent("@");
  }, [editor]);

  const onEmojiSelect = useCallback(
    ({ native }: { native: string }) => {
      if (!editor) return;
      editor.commands.focus();
      editor.commands.insertContent(native);
    },
    [editor]
  );

  const onSubmit = useCallback(() => {
    if (!editor || !editor.getText()) return;
    const content =
      contentType === "HTML" ? editor.getHTML() : editor.getText();
    const jsonContent = editor.getJSON();

    if (content.trim()) {
      props?.onSubmitText?.({
        input: content,
        mentions: extractMentions(jsonContent),
        jsonContent,
      });
      editor.commands.clearContent();
    }
  }, [editor, props]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (e.shiftKey) return;
        e.preventDefault();
        onSubmit();
      }
    },
    [editor]
  );

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col cursor-text rounded-xl transition-colors contain-inline-size border py-1.5 expandable_tiptap",
        {
          "border-[var(--interactive)]": focused,
          "border-none p-0": variant === "thread",
        }
      )}
    >
      <ScrollArea
        className="max-h-[200px] w-full overflow-y-auto px-2"
        type="auto"
      >
        <div className="flex items-baseline">
          <AvatarBase className="size-4 translate-y-0.5">
            <AvatarImage src={String(user?.profile_picture_url)} />
            <AvatarFallback
              style={{
                backgroundColor: getDeterministicColor(String(user?.id)),
              }}
              className="text-[8px] text-white"
            >
              {getInitials(String(user?.user_profiles?.username))}
            </AvatarFallback>
          </AvatarBase>
          <EditorContent
            editor={editor}
            placeholder="Add comment..."
            className="text-sm p-0 w-[250px] overflow-hidden ml-auto flex-1"
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="flex items-center justify-between mt-0.5 py">
        <div className="flex items-center gap-2 pl-4">
          {/* Emoji Picker */}
          <Popover
            onOpenChange={(open) => setShowEmojiPicker(open)}
            open={showEmojiPicker}
          >
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="size-5">
                <SmilePlus
                  size={16}
                  strokeWidth={1.5}
                  className="text-zinc-600 size-3"
                />
              </Button>
            </PopoverTrigger>
            {showEmojiPicker && (
              <PopoverContent
                side="bottom"
                align="start"
                className="border-none bg-transparent shadow-none p-0 m-0 mr-4 w-[268px]"
              >
                <EmojiPicker
                  className="h-[326px] rounded-lg border shadow-md"
                  onEmojiSelect={({ emoji }) =>
                    onEmojiSelect({ native: emoji })
                  }
                >
                  <EmojiPickerSearch />
                  <EmojiPickerContent />
                </EmojiPicker>
              </PopoverContent>
            )}
          </Popover>

          {/* Mention Button */}
          <Button
            size="icon"
            variant="ghost"
            className="size-5"
            onClick={handleMention}
          >
            <AtSign
              size={16}
              strokeWidth={1.5}
              className="text-zinc-600 size-3"
            />
          </Button>
        </div>

        <Button
          size="sm"
          className="rounded-[10px] text-white -translate-x-2"
          isDisabled={!editor?.getText().trim().length}
          onClick={onSubmit}
        >
          {variant === "default" ? "Comment" : "Reply"}
        </Button>
      </div>
    </div>
  );
}

export { CommentInput, type CommentInputProps };
