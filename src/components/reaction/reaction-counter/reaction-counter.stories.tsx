import type { Meta, StoryObj } from "@storybook/react";

import { ReactionCounter } from "./reaction-counter";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Reaction/ReactionCounter",
  component: ReactionCounter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ReactionCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Selected: Story = {
  args: {
    emoji: "👍",
    count: 2,
    isSelected: true,
  },
};

export const NotSelected: Story = {
  args: {
    emoji: "👍",
    count: 1,
    isSelected: false,
  },
};
