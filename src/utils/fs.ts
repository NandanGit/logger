const { Writable } = require('stream');
// const path = require('path');
import path from 'path';

export const isWriteStream = (stream: any): stream is NodeJS.WriteStream => {
  return stream && stream instanceof Writable;
};

export const isValidPath = (filePath: string): boolean => {
  const parsedPath = path.parse(filePath);
  return !!(parsedPath.root && parsedPath.dir && parsedPath.base);
};
