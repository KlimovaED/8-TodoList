import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../addItemForm/AddItemForm';
import {fn} from '@storybook/test';
import {EditableSpan} from './EditableSpan';

const meta:Meta <typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes,
    argTypes:{
        value:{description:'Start value empty'},
        onChange:{description:'Value Editable Span changed'}
    },
    args: {
        onChange: fn(),
        value:'hello'
    },

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} ;
export default meta;
type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanStory: Story = {};
