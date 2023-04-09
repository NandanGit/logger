import fs from 'fs';
import path from 'path';
import { iFileOutputOptions } from '../types';

export const getStreamFromFilePath = (
  filePath: string,
  options: iFileOutputOptions = {}
): NodeJS.WriteStream => {
  // console.log('getStreamFromFilePath', filePath, options);
  const { clearOnStart = true, showFileClearStatus = true } = options;
  // Check if directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    fs.writeFileSync(filePath, '');
    if (showFileClearStatus) console.log(`Created ${filePath}.`);
  }
  let stream: NodeJS.WriteStream;
  stream = fs.createWriteStream(filePath, {
    flags: clearOnStart ? 'w' : 'a',
  }) as any as NodeJS.WriteStream;
  if (fileExists && clearOnStart) {
    if (showFileClearStatus) console.log(`Cleared ${filePath}.`);
  }
  return stream;
};
