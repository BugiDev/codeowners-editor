import React, { Component } from 'react';
import styled from '@emotion/styled';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';

const ReviewersListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    height: 100%;
`;

const Title = styled.div`
    margin: 12px 12px 0 12px;
    border-bottom: 1px solid black;
`;

function generate(element: any) {
    return [0, 1, 2].map(value =>
        React.cloneElement(element, {
            key: value
        })
    );
}

class ReviewersList extends Component {
    render() {
        return (
            <ReviewersListWrapper>
                <Title>
                    <Typography variant="h4" gutterBottom>
                        Reviewers List
                    </Typography>
                </Title>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Avatar with text and icon</Typography>
                    <div>
                        <List>
                            {generate(
                                <ListItem>
                                    <Chip
                                        avatar={
                                            <Avatar>
                                                <FaceIcon />
                                            </Avatar>
                                        }
                                        label="Clickable Deletable Chip"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
            </ReviewersListWrapper>
        );
    }
}

export default ReviewersList;
