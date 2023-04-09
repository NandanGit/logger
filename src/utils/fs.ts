import path from 'path';

export const isValidPath = (filePath: string): boolean => {
  const parsedPath = path.parse(filePath);
  return !!(parsedPath.root && parsedPath.dir && parsedPath.base);
};
