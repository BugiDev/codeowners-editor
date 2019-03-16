import React, {Component} from 'react';
import styled from '@emotion/styled';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import FileList from './fileList/FileList';
import CodeownersList from './reviewersList/CodeownersList';
import AppBar from './appBar/AppBar';
import SelectedPathContext from './SelectedPathContext';

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

interface AppProps {
}

interface AppState {
    selectedPath: string,
    select: (selectedPath: string) => void,
}

class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.state = {
            selectedPath: '',
            select: this.select,
        };
    }

    select = (selectedPath: string) => {
        this.setState({selectedPath});
    };

    render() {
        const {select} = this.state;
        return (
            <SelectedPathContext.Provider value={this.state}>
                <MuiThemeProvider theme={theme}>
                    <MainWrapper>
                        <AppBar/>
                        <RowWrapper>
                            <FileList select={select}/>
                            <CodeownersList/>
                        </RowWrapper>
                    </MainWrapper>
                </MuiThemeProvider>
            </SelectedPathContext.Provider>
        );
    }
}

export default App;
