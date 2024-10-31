import React, {memo} from 'react';
import Button, {ButtonProps} from '@mui/material/Button';


type ButtonType = {} & ButtonProps
export const NewButton =memo(({variant,onClick,color,title, ...rest}:ButtonType) => {
    return (
        <Button
            variant={variant}
            color={color}
            onClick={onClick}
            {...rest}>
            {title}
        </Button>
    );
});


