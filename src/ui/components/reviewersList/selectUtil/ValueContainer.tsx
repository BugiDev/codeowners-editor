import React from "react";
import styled from "@emotion/styled";

const ValueContainerWrapper = styled.div`
    display: 'flex';
    flex-wrap: 'wrap';
    flex: 1;
    align-items: 'center';
    overflow: 'hidden';
`;

export default function ValueContainer(props: any) {
    const {children} = props;
    return <ValueContainerWrapper>{children}</ValueContainerWrapper>;
}