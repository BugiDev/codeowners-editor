import React, {Component} from 'react';
import {connect} from "react-redux";

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import styled from "@emotion/styled";

const CodeownersList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CodeownerWrapper = styled.div`
    margin-top:5px;
`;

interface AllCodeownersPanelProps {
    allCodeowners: string[]
}

class AllCodeownersPanel extends Component<AllCodeownersPanelProps> {

    private handleDelete = () => {
    };

    private renderCodeowners = () => {
        const {allCodeowners} = this.props;
        return allCodeowners.map((codeowner => (
            <CodeownerWrapper key={codeowner}>
                <Chip
                    avatar={
                        <Avatar alt={codeowner}>
                            <FaceIcon/>
                        </Avatar>
                    }
                    label={codeowner}
                    onDelete={this.handleDelete}
                />
            </CodeownerWrapper>
        )));
    };

    render() {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>All Codeowners</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CodeownersList>
                        {this.renderCodeowners()}
                    </CodeownersList>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = (state: any) => ({allCodeowners: state.codeownersFile.allCodeowners});
export default connect(mapStateToProps)(AllCodeownersPanel);

