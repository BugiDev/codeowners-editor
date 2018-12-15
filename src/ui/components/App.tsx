import React, { Component } from 'react';
import styled from '@emotion/styled';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import FileList from './fileList/FileList';
import ReviewersList from './reviewersList/ReviewersList';
import AppBar from './appBar/AppBar';

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const RowWrapper = styled.div`
    display: flex;
    height: 100%;
`;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#24292e'
        },
        secondary: {
            main: '#28a745'
        }
    },
    typography: {
        useNextVariants: true
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MainWrapper>
                    <AppBar />
                    <RowWrapper>
                        <FileList />
                        <ReviewersList />
                    </RowWrapper>
                </MainWrapper>
            </MuiThemeProvider>
        );
    }
}

export default App;
