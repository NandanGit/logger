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
    spaceAfterName = true,
    //// Time
    showTime = false,
    timeFormatter = (time) => time.toDateString(),
    useBracketsForTime = true,
    spaceAfterTime = true,
    //// Colors
    colorize = true,
  } = options;

  let name = '';
  if (showName) {
    name = nameFormatter(loggerName, options);
    name = useBracketsForName
      ? `[${name}]` + (spaceAfterName ? ' ' : '')
      : name;
  }

  let time = '';
  if (showTime) {
    if (typeof timeFormatter === 'string') {
      time = new Date().toLocaleString(timeFormatter);
    } else {
      time = showTime ? timeFormatter(new Date(), options) : '';
    }
    // time = time.trim();
    time = useBracketsForTime
      ? `[${time}]` + (spaceAfterTime ? ' ' : '')
      : time;
  }

  let symbolStr = '';
  if (showSymbol) {
    symbolStr =
      (symbol || SYMBOL_MAP[logLevel]) + (spaceAfterSymbol ? ' ' : '');
  }

  const processedOutput = (
    processArgs ? args.map(argProcessor as any) : args
  ).join(' ');
  const coloredOutput =
    (colorize ? COLOR_MAP[logLevel] : '') +
    processedOutput +
    (colorize ? COLOR_MAP.default : '');

  const endString = newLine ? lineEnding : '';

  stream.write(name + time + symbolStr + coloredOutput + endString);
};
