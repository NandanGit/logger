import { $Output } from '../types';
import { isWriteStream } from '../../utils/fs';

export const processOutput = (
  output: any,
  processedDefault: any
): $Output | $Output[] => {
  if (!output) return processedDefault;
  if (Array.isArray(output)) {
    return (output as $Output[]).map(processOutput) as $Output[];
  }

  if (isWriteStream(output)) {
    return {
      type: 'STD_OUT',
      target: output,
    };
  }

  if (typeof output === 'string') {
    return {
      type: 'FILE',
      path: output,
      options: {},
    };
  }

  if (output.type === 'FILE') {
    return {
      type: 'FILE',
      path: output.path,
      options: output.options || {},
    };
  }

  return {
    type: output.type,
    target: output.target,
  };
};
