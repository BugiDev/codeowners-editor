import React, {Component} from 'react';
import {connect} from "react-redux";

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from "@emotion/styled";
import CircularProgress from '@material-ui/core/CircularProgress';

const PreviewWrapper = styled.div`
    font-size: 12px;
    font-family: Consolas, monaco, monospace;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    background-color: #eeeeee;
    padding: 5px;
    white-space: pre-wrap;
    width: 100%;
`;

const LoaderWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

interface CodeownersPreviewPanelProps {
    loading: boolean,
    rawCodeowners: string,
    defaultExpanded: boolean
}

class CodeownersPreviewPanel extends Component<CodeownersPreviewPanelProps> {
    render() {
        const {loading, rawCodeowners, defaultExpanded} = this.props;
        let content;
        if (loading) {
            content = (
                <PreviewWrapper>
                    <LoaderWrapper>
                        <CircularProgress size={15}/>
                    </LoaderWrapper>
                </PreviewWrapper>
            );
        } else {
            content = (
                <PreviewWrapper>
                    {rawCodeowners}
                </PreviewWrapper>
            );
        }

        return (
            <ExpansionPanel defaultExpanded={defaultExpanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>CODEOWNERS file preview</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {content}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = (state: any) => ({
    loading: state.codeownersFile.loading,
    rawCodeowners: state.codeownersFile.rawCodeowners
});

export default connect(mapStateToProps)(CodeownersPreviewPanel);

