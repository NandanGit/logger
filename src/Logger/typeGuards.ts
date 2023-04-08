import log from '../utils/log';
import { $Output, $Outputs } from './types';
import { isValidPath, isWriteStream } from '../utils/fs';

export function isValidOutputs(arg: any): arg is $Outputs {
  if (typeof arg !== 'object' || arg === null) {
    return false;
  }
  const validKeys = ['default', 'success', 'info', 'warning', 'error', 'debug'];
  for (const key in arg) {
    if (!validKeys.includes(key)) {
      return false;
    }
    const value = arg[key];
    if (!isValidOutput(value)) {
      return false;
    }
  }
  return true;
}

export function isValidOutput(value: any): value is $Output | $Output[] {
  if (Array.isArray(value)) {
    return value.every((item) => isValidOutput(item));
  }
  if (value === 'console') return true;
  if (value === process.stdin)
    throw new Error(`Invalid output. Cannot use process.stdin as an output.`);
  if (isWriteStream(value)) return true;
  if (typeof value === 'string') {
    if (!isValidPath(value))
      throw new Error(
        `Invalid path: "${value}" is not a valid path. path must be absolute. Try using path.join(__dirname, 'path/to/file') to get the absolute path.`
      );
    return true;
  }
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if (value.type === 'FILE') {
    if (typeof value.path !== 'string') {
      return false;
    }
    if (!isValidPath(value.path))
      throw new Error(
        `Invalid path: "${value.path}" is not a valid path. path must be absolute. Try using path.join(__dirname, 'path/to/file') to get the absolute path.`
      );

    if (value.options) {
      if (
        typeof value.options !== 'object' ||
        value.options === null ||
        Array.isArray(value.options)
      ) {
        throw new Error(`Invalid file options. Must be an object.`);
      }
    }
    return true;
  }
  if (value.type === 'STD_OUT' || value.type === 'STD_ERR') {
    if (!value.target || !isWriteStream(value.target)) {
      throw new Error(`target must be a valid WriteStream.`);
    }
    return true;
  }
  if (value.type) {
    throw new Error(
      'Invalid output type. Must be "FILE" or "STD_OUT" or "STD_ERR"'
    );
  }
  return false;
}
