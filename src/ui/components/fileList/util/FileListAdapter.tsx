import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FileIcon from '@material-ui/icons/InsertDriveFileOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { NodeInfo } from 'Core/fileTree';

export interface FileListItem extends NodeInfo {
    icon: (props: any) => JSX.Element;
    switcherIcon: (props: any) => JSX.Element;
    key: string;
    title: string;
    isLeaf: boolean;
    children: FileListItem[];
}

function addAdditionalFields(fileListItem: NodeInfo): FileListItem {
    return {
        ...fileListItem,
        key: fileListItem.path,
        title: fileListItem.name,
        isLeaf: !(fileListItem.children && fileListItem.children.length > 0)
    } as FileListItem;
}

function addIcon(fileListItem: FileListItem): void {
    if (fileListItem.type === 'folder') {
        fileListItem.icon = (props: any) => {
            const { expanded } = props;
            if (expanded) {
                return <FolderOpenIcon fontSize='small' />;
            }
            return <FolderIcon fontSize='small' />;
        };
        if (fileListItem.children.length > 0) {
            fileListItem.switcherIcon = (props: any) => {
                const { expanded } = props;
                if (expanded) {
                    return <RemoveIcon fontSize='small' />;
                }
                return <AddIcon fontSize='small' />;
            };
        }
    } else {
        fileListItem.icon = () => <FileIcon fontSize='small' />;
    }
}

function walkFileList(fileList: NodeInfo): FileListItem {
    const fileListItem = addAdditionalFields(fileList);
    addIcon(fileListItem);

    if (!fileListItem.isLeaf) {
        fileListItem.children = fileListItem.children.map((value: NodeInfo) => walkFileList(value));
    }

    return fileListItem;
}

export function upgradeFileList(fileList: NodeInfo): FileListItem {
    return walkFileList(fileList);
}
