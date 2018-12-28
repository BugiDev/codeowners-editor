import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from '@emotion/styled';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {upgradeFileList} from "UI/components/fileList/util/FileListAdapter";

const ReviewersListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    height: 100%;
    -webkit-box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.4);
    box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.4);
    z-index: 2;
    background-color: #eeeeee;
`;

const Title = styled.div`
    margin: 12px 12px 0 12px;
`;

function generate(element: any) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value
        })
    );
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

interface ReviewersListProps {
    allCodeowners: Set<string>
}

interface ReviewersListState {
    name: [];
    codeownersFileData: { lines: [] };
}

class ReviewersList extends Component<ReviewersListProps, ReviewersListState> {
    constructor(props: ReviewersListProps) {
        super(props);
        this.state = {
            name: [],
            codeownersFileData: {lines: []}
        };
    }

    handleChange = (event: any) => {
        this.setState(prevState => ({...prevState, name: event.target.value}));
    };

    render() {
        const {name, codeownersFileData} = this.state;
        const {allCodeowners} = this.props;
        return (
            <ReviewersListWrapper>
                <Title>
                    <Typography variant="h4" gutterBottom>
                        Reviewers List
                    </Typography>
                </Title>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>All Reviewers</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                           {allCodeowners}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Add reviewer to selected path</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FormControl>
                            <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                            <Select
                                multiple
                                value={name}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-chip"/>}
                                renderValue={(selected: any) => (
                                    <div>
                                        {selected.map((value: any) => (
                                            <Chip
                                                avatar={
                                                    <Avatar>
                                                        <FaceIcon/>
                                                    </Avatar>
                                                }
                                                key={value}
                                                label={value}
                                                onClick={() => {
                                                }}
                                                onDelete={() => {
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {names.map(menuName => (
                                    <MenuItem key={menuName} value={menuName}>
                                        {menuName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>CODEOWNERS file preview</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <Typography>
                            {codeownersFileData.lines.map((data: any) => <span>{`${data.path} ${data.codeowners.join(' ')}`}</span>
                            )}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </ReviewersListWrapper>
        );
    }
}

const mapStateToProps = (state: any) => ({allCodeowners: state.codeownersFile.allCodeowners});

export default connect(mapStateToProps)(ReviewersList);

