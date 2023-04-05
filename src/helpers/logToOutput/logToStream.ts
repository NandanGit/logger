import { $LogType, iLoggerOptions, iSymbolMap } from '../../Logger/types';
import { COLOR_MAP } from '../../constants';

const logToStream = (
  stream: NodeJS.WriteStream,
  options: iLoggerOptions,
  logType: $LogType,
  args: any[],
  SYMBOL_MAP: iSymbolMap
) => {
  const {
    processArgs = false,
    argProcessor = JSON.stringify,
    newLine = true,
    lineEnding = '\n',
    showSymbol = true,
    spaceAfterSymbol = true,
    showName = true,
    loggerName = 'Logger',
    useBracketsForName = true,
    nameFormatter = (name) => name,
  } = options;
  const processedOutput = (
    processArgs ? args.map(argProcessor as any) : args
  ).join(' ');

  const symbol = showSymbol
    ? SYMBOL_MAP[logType] + (spaceAfterSymbol ? ' ' : '')
    : '';
  const coloredOutput =
    COLOR_MAP[logType] + processedOutput + COLOR_MAP.default;
  const endString = newLine ? lineEnding : '';
  const name = showName
    ? `${useBracketsForName ? '[' : ''}${nameFormatter(loggerName)}${
        useBracketsForName ? ']' : ''
      } `
    : '';
  stream.write(name + symbol + coloredOutput + endString);
  // console.log(Object.keys(this as any)[0]);
};

export default logToStream;
