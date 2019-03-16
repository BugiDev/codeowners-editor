
import React from "react";
import TextField from "@material-ui/core/TextField";

function inputComponent({inputRef, ...props}: { inputRef: any }) {
    return <div ref={inputRef} {...props} />;
}

export default function Control(props: any) {
    const {selectProps, innerRef, children, innerProps} = props;
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    style: {
                        display: 'flex',
                        padding: 0
                    },
                    inputRef: innerRef,
                    children,
                    ...innerProps,
                },
            }}
            {...selectProps.textFieldProps}
        />
    );
}