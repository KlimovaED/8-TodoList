import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";

export type PropsType = {
	addItem: (title: string) => void
    disabled?:boolean
}

export const AddItemForm=memo( ({addItem,disabled=false}: PropsType) => {

	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trim())
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
                disabled={disabled}
				label="Enter a title"
				variant={'outlined'}
				value={title}
				size={'small'}
				error={!!error}
				helperText={error}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/>
			<IconButton onClick={addItemHandler} color={'primary'} disabled={disabled}>
				<AddBoxIcon />!
			</IconButton>
		</div>
	)
})


