import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import { MentionList } from "../mention-list/mention-list";

export default {
  render: () => {
    let component: ReactRenderer | null = null;
    let popup: Instance[] | null = null;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(MentionList, {
          props: {
            items: props?.items,
            command: props?.command,
          },
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "top-start",
        });
      },

      onUpdate(props: any) {
        component?.updateProps({
          items: props?.items, // Update items when the query changes
          command: props?.command,
        });

        if (!props.clientRect) {
          return;
        }

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup?.[0].hide();
          return true;
        }
        
        //@ts-ignore
        return component?.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.[0].destroy();
        component?.destroy();
      },
    };
  },
};
