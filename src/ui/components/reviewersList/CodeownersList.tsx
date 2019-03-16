import React, {Component} from 'react';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';

import AllCodeownersPanel from 'UI/components/reviewersList/AllCodeownersPanel';
import AddCodeownersPanel from 'UI/components/reviewersList/AddCodeownersPanel';
import CodeownersPreviewPanel from 'UI/components/reviewersList/CodeownersPreviewPanel';

import SelectedPathContext from 'UI/components/SelectedPathContext';

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


export default class CodeownersList extends Component {

    render() {
        return (
            <ReviewersListWrapper>
                <Title>
                    <Typography variant="h4" gutterBottom>
                        Codeowners List
                    </Typography>
                </Title>
                <AllCodeownersPanel/>
                <SelectedPathContext.Consumer>
                    {(context) => <AddCodeownersPanel selectedPath={context.selectedPath} />}
                </SelectedPathContext.Consumer>
                <CodeownersPreviewPanel defaultExpanded/>
            </ReviewersListWrapper>
        );
    }
}

CodeownersList.contextType = SelectedPathContext;
