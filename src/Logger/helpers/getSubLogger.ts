import { DEFAULT_SYMBOLS } from '../../constants';
import { isTerminalOutput } from '../typeGuards';
import {
  $LogType,
  $Output,
  $SubLogger,
  $SymbolMap,
  iLogger,
  iLoggerOptions,
} from '../types';
import { logToFile } from './logToOutput/logToFile';
import { logToStream } from './logToOutput/logToStream';

export const getSubLogger = (
  output: $Output | $Output[],
  options: iLoggerOptions,
  logLevel: $LogType
  // SYMBOL_MAP: $SymbolMap
): $SubLogger | iLogger => {
  const { symbols = {} } = options;
  const SYMBOL_MAP = {
    ...DEFAULT_SYMBOLS,
    ...symbols,
  };
  return (...args) => {
    const outputs = Array.isArray(output) ? output : [output];
    // console.log(outputs.map((elem) => typeof elem));
    outputs.forEach((output) => {
      if (isTerminalOutput(output)) {
        return logToStream(output.target, options, logLevel, args, SYMBOL_MAP);
      }
      logToFile(output, options, logLevel, args, SYMBOL_MAP);
    });
  };
};
