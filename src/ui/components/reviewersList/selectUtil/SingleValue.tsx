import styled from "@emotion/styled";
import React from "react";
import Typography from '@material-ui/core/Typography';

const SingleValueWrapper = styled.div`
    font-size: 16;
`;

export default function SingleValue(props: any) {
    const {innerProps, children} = props;
    return (
        <SingleValueWrapper>
            <Typography {...innerProps}>
                {children}
            </Typography>
        </SingleValueWrapper>
    );
}
