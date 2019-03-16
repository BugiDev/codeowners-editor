import React from "react";
import styled from "@emotion/styled";
import Paper from '@material-ui/core/Paper';

const PaperWrapper = styled.div`
    position: 'absolute';
    z-index: 1;
    margin-top: 8px;
    left: 0;
    right: 0;
`;

export default function Menu(props: any) {
    const {innerProps, children} = props;
    return (
        <PaperWrapper>
            <Paper square {...innerProps}>
                {children}
            </Paper>
        </PaperWrapper>
    );
}