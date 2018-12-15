import carlo from 'carlo';
import path from 'path';

import { dirTree } from './fileTree';

export default async function launchUIBridge(devMode: boolean) {
    const app = await carlo.launch();

    // Terminate Node.js process on app window closing.
    app.on('exit', () => process.exit());

    if (devMode) {
        app.serveOrigin('https://127.0.0.1:9000');
    } else {
        app.serveFolder(path.resolve(__dirname, '../ui'));
    }

    const absolutePath = path.resolve('./');

    await app.exposeFunction('getDirStructure', () => dirTree(absolutePath));

    // Navigate to the main page of your app.
    await app.load('../../index.html');
}
