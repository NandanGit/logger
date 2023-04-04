import {
	$LogType,
	iFile,
	iLoggerOptions,
	iSymbolMap,
} from '../../Logger/types';

const logToFile = (
	file: iFile,
	options: iLoggerOptions,
	logType: $LogType,
	args: any[],
	SYMBOL_MAP: iSymbolMap
) => {
	console.log('logging to file:', file, ...args, `[${logType}]`);
};

export default logToFile;
