import { $LogType, $SymbolMap, iLoggerOptions } from '../../types';
import { COLOR_MAP } from '../../../constants';
import { formatTime } from '../../../utils/time';
import { colorize, reduceColorsInString } from '../../../utils/string';

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
    colorize: colorizeText = true,
    reduceColors = true,
  } = options;

  // Parse colors if reduceColors is true
  if (reduceColors) {
    args = args.map((arg) => {
      if (typeof arg === 'string') {
        return reduceColorsInString(arg, logLevel);
      }
      return arg;
    });
  }

  let name = '';
  if (showName) {
    name = nameFormatter(loggerName, options);
    name = useBracketsForName ? `[${name}]` : name;
    name = spaceAfterName ? name + ' ' : name;
  }

  let time = '';
  if (showTime) {
    if (typeof timeFormatter === 'string') {
      time = formatTime(new Date(), timeFormatter);
    } else {
      time = showTime ? timeFormatter(new Date(), options) : '';
    }
    // time = time.trim();
    time = useBracketsForTime ? `[${time}]` : time;
    time = spaceAfterTime ? time + ' ' : time;
  }

  let symbolStr = '';
  if (showSymbol) {
    symbolStr =
      (symbol || SYMBOL_MAP[logLevel]) + (spaceAfterSymbol ? ' ' : '');
  }

  const processedOutput = (processArgs ? args.map(argProcessor) : args).join(
    ' '
  );

  let coloredOutput = processedOutput;
  if (colorizeText) {
    coloredOutput = colorize(processedOutput, logLevel);
  }

  const endString = newLine ? lineEnding : '';

  stream.write(name + time + symbolStr + coloredOutput + endString);
};
