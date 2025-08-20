import * as React from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../../src/button";
import { SearchCheck } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Atomic UI Components/Button",
  component: Button,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onClick: { action: "clicked" },
    tooltipAlignment: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    tooltipPosition: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
  },
};

export const WithPrepend = () => {
  return <Button prepend={<SearchCheck className="size-4" />}>Search</Button>;
};
