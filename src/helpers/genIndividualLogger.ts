import {
	$Loggable,
	$LogType,
	$SubLogger,
	iFile,
	iLoggerOptions,
	iSymbolMap,
} from '../Logger/types';
import logToFile from './logToOutput/logToFile';
import logToStream from './logToOutput/logToStream';

const genIndividualLogger = (
	output: $Loggable,
	options: iLoggerOptions,
	logType: $LogType,
	SYMBOL_MAP: iSymbolMap
): $SubLogger => {
	return (...args) => {
		const outputs = Array.isArray(output) ? output : [output];
		// console.log(outputs.map((elem) => typeof elem));
		outputs.forEach((output) => {
			if (!(output as iFile).path) {
				return logToStream(
					output as NodeJS.WriteStream,
					options,
					logType,
					args,
					SYMBOL_MAP
				);
			}
			logToFile(output as iFile, options, logType, args, SYMBOL_MAP);
		});
	};
};

export default genIndividualLogger;
