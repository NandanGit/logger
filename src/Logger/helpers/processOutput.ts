import { $Output, iLoggerOptions } from '../types';
import { isWriteStream } from '../typeGuards';
import { getStreamFromFilePath } from './getStreamFromFilePath';
import { processFileOptions } from './processOptions';

export const processOutput = (
  output: any,
  processedDefault: $Output | $Output[],
  options: iLoggerOptions = {}
): $Output | $Output[] => {
  if (!output) return processedDefault;
  if (Array.isArray(output)) {
    // return (output as $Output[]).map(processOutput) as $Output[];
    return (output as $Output[]).map((output) => {
      return processOutput(output, processedDefault, options);
    }) as $Output[];
  }

  if (isWriteStream(output) || output === 'console') {
    return {
      type: 'STD_OUT',
      target: output === 'console' ? process.stdout : output,
      options: {},
    };
  }

  if (typeof output === 'string') {
    const processedOptions = processFileOptions(options);
    return {
      type: 'FILE',
      path: output,
      target: getStreamFromFilePath(output, processedOptions),
      options: {},
    };
  }

  if (output.type === 'FILE') {
    const processedOptions = processFileOptions({
      ...options,
      ...(output.options || {}),
    });
    return {
      type: 'FILE',
      path: output.path,
      target: getStreamFromFilePath(output.path, processedOptions),
      options: processFileOptions(output.options || {}),
    };
  }

  return {
    type: output.type,
    target: output.target,
    options: output.options || {},
  };
};
