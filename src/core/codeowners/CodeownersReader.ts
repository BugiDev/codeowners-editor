import fs from 'fs';
import readline from 'readline';
import path from 'path';

export interface CodeownersLine{
    path: string;
    codeowners: string[];
}

export interface CodeownersFile{
    lines: CodeownersLine[];
    allCodeowners: string[];
    fileExists: boolean;
}

const codeownersRootLocation = path.resolve(process.cwd(),  'CODEOWNERS');
const codeownersGitHubLocation = path.resolve(process.cwd(),  '.github/CODEOWNERS');

async function processLineByLine(filepath: string): Promise<{lines: CodeownersLine[], allCodeowners: string[]}> {
    const lines = [] as CodeownersLine[];
    const allCodeowners = new Set() as Set<string>;
    const fileStream = fs.createReadStream(filepath);

    const lineReader = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    lineReader.on('line', (line) => {
        if (line !== '' && !line.trim().startsWith('#')) {
            const splitLine = line.split(' ');
            const codeownersSubarray = splitLine.slice(1);
            codeownersSubarray.forEach((codeowner) => {allCodeowners.add(codeowner)});
            lines.push({
                path: splitLine[0],
                codeowners: codeownersSubarray
            } as CodeownersLine);
        }
    });

    return new Promise( (resolve, reject)=> {
        lineReader.on('close', () => {
            resolve({lines, allCodeowners: Array.from(allCodeowners)});
        })
    });
}

export async function readCodeownersFile(): Promise<CodeownersFile> {
    let fileExists = false;
    let  processedLines = {
        lines: [] as CodeownersLine[],
        allCodeowners: [] as string[]
    };
    if (fs.existsSync(codeownersRootLocation)) {
        processedLines = await processLineByLine(codeownersRootLocation);
        fileExists = true;
    } else {
        if (fs.existsSync(codeownersGitHubLocation)) {
            processedLines = await processLineByLine(codeownersGitHubLocation);
            fileExists = true;
        }
    }
    return {
        lines: processedLines.lines,
        allCodeowners: processedLines.allCodeowners,
        fileExists
    }
}
