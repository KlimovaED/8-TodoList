import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm, PropsType} from './AddItemForm';
import {fn} from '@storybook/test';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta:Meta <typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: { description: 'Button clicked inside form',
        action:'clicked'},
    },
    args: {
        addItem: fn(),
    },

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} ;

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {

};
const  AddItemFormWithError =(props:PropsType)=>{
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(error){
            setError(null)
        }
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon/>!
            </IconButton>
        </div>
    )
}

export const AddItemFormDisabled=(props:any)=>{
    return(<AddItemForm disabled={true} addItem={action('Button' +
            ' inside' +
            ' form clicked')} />

    )
}

export const AddItemFormWithErrorStory :Story={
    render:(args)=><AddItemFormWithError addItem={args.addItem} />
}





