import React, {Component} from 'react';
import {connect} from "react-redux";

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from "@emotion/styled";
import CircularProgress from '@material-ui/core/CircularProgress';
import CreatableSelect from 'react-select/lib/Creatable';
import {ValueType} from "react-select/lib/types";
import path from 'path';

import NoOptionsMessage from 'UI/components/reviewersList/selectUtil/NoOptionsMessage';
import Control from 'UI/components/reviewersList/selectUtil/Control';
import Option from 'UI/components/reviewersList/selectUtil/Option';
import Placeholder from 'UI/components/reviewersList/selectUtil/Placeholder';
import SingleValue from 'UI/components/reviewersList/selectUtil/SingleValue';
import ValueContainer from 'UI/components/reviewersList/selectUtil/ValueContainer';
import MultiValue from 'UI/components/reviewersList/selectUtil/MultiValue';
import Menu from 'UI/components/reviewersList/selectUtil/Menu';

const CreatableSelectWrapper = styled.div`
    width: 100%;
`;

const LoaderWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

interface AddCodeownersPanelProps {
    loading: boolean,
    allCodeowners: { value: string; label: string; }[],
    selectedPath:  string,
    codeownerLines: [];
}

interface AddCodeownersPanelState {
    selectedCodeowners: ValueType<{ value: string; label: string; }>,
    expanded: boolean;
}

class AddCodeownersPanel extends Component<AddCodeownersPanelProps, AddCodeownersPanelState> {

    constructor(props: AddCodeownersPanelProps) {
        super(props);
        this.state = {
            selectedCodeowners: null,
            expanded: false
        };
    }

    componentDidUpdate(prevProps: AddCodeownersPanelProps) {
        const {selectedPath, allCodeowners, codeownerLines} = this.props;
        if (prevProps.selectedPath !== selectedPath) {
            this.handleExpandChange(null, !!selectedPath);
            if (selectedPath && allCodeowners.length > 0 && codeownerLines.length > 0) {
                const selectedCodeowners = this.getCodeownersForSelectedPath(selectedPath, codeownerLines);
                this.handleChange(selectedCodeowners);
            }
        }
    }

    getCodeownersForSelectedPath = (selectedPath: string, codeownerLines: {absolutePath: string, path: string, codeowners: []}[]) => {
        for (let i = 0; i < codeownerLines.length; i++) {
            const relative = path.relative(selectedPath, codeownerLines[i].absolutePath);
            if (!relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
                return codeownerLines[i].codeowners.map((codeowner: string) => ({
                    value: codeowner,
                    label: codeowner,
                }))
            }
        }
        return null;
    };

    handleChange = (value: any) => {
        this.setState({
            selectedCodeowners: value,
        });
    };

    handleExpandChange = (e: any, expanded: boolean) => {
        this.setState({
            expanded
        });
    };

    render() {
        const {selectedCodeowners, expanded} = this.state;
        const {loading, allCodeowners, selectedPath, codeownerLines} = this.props;
        let content;

        if (loading) {
            content = (
                <LoaderWrapper>
                    <CircularProgress size={15}/>
                </LoaderWrapper>
            );
        } else {
            if (!selectedPath) {
                content = <Typography color="textSecondary">Select folder or file to edit the codeowners properties</Typography>;
            } else {
                content = (
                    <CreatableSelectWrapper>
                        <CreatableSelect
                            textFieldProps={{
                                label: 'Label',
                                InputLabelProps: {
                                    shrink: true,
                                },
                            }}
                            options={allCodeowners}
                            components={{
                                Control,
                                Menu,
                                MultiValue,
                                NoOptionsMessage,
                                Option,
                                Placeholder,
                                SingleValue,
                                ValueContainer,
                            }}
                            value={selectedCodeowners}
                            onChange={this.handleChange}
                            placeholder="Select codeowners or add new ones"
                            isMulti
                        />
                    </CreatableSelectWrapper>
                );
            }
        }

        return (
            <ExpansionPanel expanded={expanded} onChange={this.handleExpandChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Add Codeowner to selected path</Typography>
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
    codeownerLines: state.codeownersFile.lines,
    allCodeowners: state.codeownersFile.allCodeowners.map((codeowner: string) => ({
        value: codeowner,
        label: codeowner,
    }))
});

export default connect(mapStateToProps)(AddCodeownersPanel);
