import {ChangeEvent, memo, useState} from 'react';
import TextField from "@mui/material/TextField";

type PropsType = {
	value: string
	onChange: (newTitle: string) => void
    disabled?:boolean
};

export const EditableSpan =memo(({value, onChange,disabled=false}: PropsType) => {

    console.log('Editable Span')
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(value)



	const activateEditModeHandler = () => {
        if(!disabled) {
            setEditMode(true)
            setTitle(title);
        }
	}

	const deactivateEditModeHandler = () => {
        if(!disabled) {
            setEditMode(false)
            onChange(title)
        }
	}

	const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	return (
		<>
			{editMode
				?
				<TextField
					variant={'outlined'}
					value={title}
					size={'small'}
					onChange={changeTitleHandler}
					onBlur={deactivateEditModeHandler}
					autoFocus
                    disabled={disabled}
				/>
				: <span onDoubleClick={activateEditModeHandler} style={{wordWrap:'break-word'}}>{value}</span>
			}
		</>
	);
});
