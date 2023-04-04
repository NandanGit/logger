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
		processArgs,
		argProcessor,
		newLine = true,
		lineEnding = '\n',
		showSymbol = true,
		spaceAfterSymbol = true,
	} = options;
	const processedOutput = (
		processArgs ? args.map((argProcessor || JSON.stringify) as any) : args
	).join(' ');

	const symbol = showSymbol
		? SYMBOL_MAP[logType] + (spaceAfterSymbol ? ' ' : '')
		: '';
	const coloredOutput =
		COLOR_MAP[logType] + processedOutput + COLOR_MAP.default;
	const endString = newLine ? lineEnding : '';
	stream.write(symbol + coloredOutput + endString);
	// console.log(Object.keys(this as any)[0]);
};

export default logToStream;
