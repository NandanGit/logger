import { formatTime } from '../../../utils/time';
import { $LogType, $SymbolMap, iFileOutput, iLoggerOptions } from '../../types';
import { logToStream } from './logToStream';

export const logToFile = (
  file: iFileOutput,
  options: iLoggerOptions,
  logLevel: $LogType,
  args: any[],
  SYMBOL_MAP: $SymbolMap
): void => {
  const allArgsArePrimitive = args.every((arg) => {
    return (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean'
    );
  });

  const softOverrides: iLoggerOptions = {
    // Cause somethings should be logged to a file only if user is sure
    // This options are overridable by user only if they provide them in file options, not in logger options
    processArgs: allArgsArePrimitive ? options.processArgs : true,
    argProcessor: allArgsArePrimitive ? options.argProcessor : JSON.stringify,

    showTime: true,
  };

  const hardOverrides: iLoggerOptions = {
    // Cause somethings just shouldn't be logged to a file
    // This options are not overridable by user
    colorize: false, // Colors in files? Come on!
  };

  const combinedOptions = {
    ...options,
    ...softOverrides,
    ...file.options,
    ...hardOverrides,
  };

  // console.log('combinedOptions', combinedOptions);
  if (combinedOptions.period) {
    // Check if file has expired
    if (
      file.target.expiresAt &&
      file.target.expiresAt.getTime() < new Date().getTime()
    ) {
      file.target.updateStream();
    }
  }

  logToStream(file.target.stream, combinedOptions, logLevel, args, SYMBOL_MAP);
};
