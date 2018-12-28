import React, { Component } from 'react';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tree from 'rc-tree';
import 'UI/style/tree.css';

import { upgradeFileList, FileListItem } from './util/FileListAdapter';

const FileListWrapper = styled.div`
    display: flex;
    flex: 7;
    height: 100%;
    flex-direction: column;
    overflow: scroll;
    background-color: #FAFAFA;
`;

const Title = styled.div`
    margin: 12px 12px 0 12px;
    border-bottom: 1px solid black;
`;

const LoaderWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

interface FileListProps {}

interface FileListState {
    data: FileListItem[];
}

class FileList extends Component<FileListProps, FileListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.run();
    }

    run = async () => {
        // Call the function that was exposed in Node.
        const data = upgradeFileList(await getDirStructure());

        this.setState((prevState: FileListState) => ({
            ...prevState,
            data: [data]
        }));
    };

    render() {
        let content: JSX.Element;
        const { data } = this.state;
        if (data.length < 1) {
            content = (
                <LoaderWrapper>
                    <CircularProgress size={70} />
                </LoaderWrapper>
            );
        } else {
            content = (
                <Tree
                    defaultExpandAll={false}
                    defaultExpandedKeys={[data && data[0].key]}
                    showLine
                    treeData={data}
                />
            );
        }

        return (
            <FileListWrapper>
                <Title>
                    <Typography variant="h4" gutterBottom>
                        File List
                    </Typography>
                </Title>

                {content}
            </FileListWrapper>
        );
    }
}

export default FileList;
