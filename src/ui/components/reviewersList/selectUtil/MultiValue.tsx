import React from "react";
import styled from "@emotion/styled";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import CancelIcon from '@material-ui/icons/Cancel';

const ChipWrapper = styled.div`
    margin: 4px 2px;
`;

export default function MultiValue(props: any) {
    const {removeProps, children} = props;
    return (
        <ChipWrapper>
            <Chip
                tabIndex={-1}
                avatar={
                    <Avatar alt={children}>
                        <FaceIcon/>
                    </Avatar>
                }
                label={children}
                onDelete={removeProps.onClick}
                deleteIcon={<CancelIcon {...removeProps} />}
            />
        </ChipWrapper>
    );
}