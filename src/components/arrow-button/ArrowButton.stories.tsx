import type { Meta, StoryObj } from '@storybook/react';
import { ArrowButton } from './ArrowButton';

// Описание метаданных для Storybook
const meta: Meta<typeof ArrowButton> = {
  component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

// История с демонстрацией работы ArrowButton
export const ArrowButtonStory: Story = {
  render: (args) => {
    return (
      <>
        <ArrowButton {...args} />
      </>
    );
  },
  args: {
    isOpen: false,  // Начальное состояние формы (закрыта)
    onClick: () => alert('Button clicked!'),  // Обработчик клика (можно заменить любой логикой)
  },
};
