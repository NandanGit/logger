import { $LogType, $SymbolMap, iLoggerOptions } from '../../types';
import { COLOR_MAP } from '../../../constants';

export const logToStream = (
  stream: NodeJS.WriteStream,
  options: iLoggerOptions,
  logLevel: $LogType,
  args: any[],
  SYMBOL_MAP: $SymbolMap
): void => {
  const {
    loggerName = 'Logger',
    processArgs = false,
    argProcessor = (val) => val.toString(), //JSON.stringify,
    // Formatting options
    //// Line ending
    newLine = true,
    lineEnding = '\n',
    //// Symbols
    showSymbol = true,
    spaceAfterSymbol = true,
    //// Name
    showName = true,
    useBracketsForName = true,
    nameFormatter = (name) => name,
    //// Colors
    colorize = true,
  } = options;

  const processedOutput = (
    processArgs ? args.map(argProcessor as any) : args
  ).join(' ');

  const symbol = showSymbol
    ? SYMBOL_MAP[logLevel] + (spaceAfterSymbol ? ' ' : '')
    : '';
  const coloredOutput =
    (colorize ? COLOR_MAP[logLevel] : '') +
    processedOutput +
    (colorize ? COLOR_MAP.default : '');
  const endString = newLine ? lineEnding : '';
  const name = showName
    ? `${useBracketsForName ? '[' : ''}${nameFormatter(loggerName)}${
        useBracketsForName ? ']' : ''
      } `
    : '';
  stream.write(name + symbol + coloredOutput + endString);
};
