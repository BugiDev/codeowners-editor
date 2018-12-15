import path from 'path';
import fs from 'fs';

export interface NodeInfo {
    path: string;
    name: string;
    type: string;
    children: NodeInfo[];
}

export function dirTree(filePath: string): NodeInfo {
    const stats = fs.lstatSync(filePath);
    const info: NodeInfo = {
        path: filePath,
        name: path.basename(filePath),
        type: '',
        children: []
    };

    if (stats.isDirectory()) {
        info.type = 'folder';
        info.children = fs.readdirSync(filePath).map(child => dirTree(`${filePath}/${child}`));
    } else {
        info.type = 'file';
    }

    return info;
}
