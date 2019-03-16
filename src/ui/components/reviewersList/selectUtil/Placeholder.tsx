import styled from "@emotion/styled";
import React from "react";
import Typography from '@material-ui/core/Typography';

const PlaceholderWrapper = styled.div`
     position: 'absolute';
     left: 2;
     font-size: 16;
`;

export default function Placeholder(props: any) {
    const {innerProps, children} = props;
    return (
        <PlaceholderWrapper>
            <Typography
                color="textSecondary"
                {...innerProps}
            >
                {children}
            </Typography>
        </PlaceholderWrapper>
    );
}