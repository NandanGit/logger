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
    symbol,
    spaceAfterSymbol = true,
    //// Name
    showName = true,
    useBracketsForName = true,
    nameFormatter = (name) => name,
    //// Time
    showTime = true,
    timeFormatter = (time) => time.toDateString(),
    //// Colors
    colorize = true,
  } = options;

  const processedOutput = (
    processArgs ? args.map(argProcessor as any) : args
  ).join(' ');

  const symbolStr = showSymbol
    ? (symbol || SYMBOL_MAP[logLevel]) + (spaceAfterSymbol ? ' ' : '')
    : '';
  const coloredOutput =
    (colorize ? COLOR_MAP[logLevel] : '') +
    processedOutput +
    (colorize ? COLOR_MAP.default : '');
  const endString = newLine ? lineEnding : '';
  const name = showName
    ? `${useBracketsForName ? '[' : ''}${nameFormatter(loggerName, options)}${
        useBracketsForName ? ']' : ''
      } `
    : '';
  stream.write(name + symbolStr + coloredOutput + endString);
};
