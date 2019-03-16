import styled from "@emotion/styled";
import React from "react";
import Typography from '@material-ui/core/Typography';

const NoOptionsMessageWrapper = styled.div`
    padding: 8px 16px;
`;

export default function NoOptionsMessage(props: any) {
    const {innerProps} = props;
    return (
        <NoOptionsMessageWrapper>
            <Typography
                color="textSecondary"
                {...innerProps}
            >
                Enter the GitHub handle to add a new codeowner
            </Typography>
        </NoOptionsMessageWrapper>
    );
}