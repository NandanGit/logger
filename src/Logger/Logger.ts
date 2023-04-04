import genIndividualLogger from '../helpers/genIndividualLogger';
import logToFile from '../helpers/logToOutput/logToFile';
import logToStream from '../helpers/logToOutput/logToStream';
import {
	$Loggable,
	iLoggerOptions,
	iLoggerOutputs,
	iLogger,
	iFile,
} from './types';

export const COLOR_MAP = {
	default: '\x1b[0m',
	success: '\x1b[32m',
	info: '\x1b[34m',
	warning: '\x1b[33m',
	error: '\x1b[31m',
	debug: '\x1b[35m',
};

export const createLogger = (
	output: $Loggable | iLoggerOutputs,
	options: iLoggerOptions
): iLogger => {
	const { symbols = {} } = options;
	// console.log('createLogger called with:', output, options);
	let defaultOutput: $Loggable;
	let successOutput: $Loggable | undefined;
	let infoOutput: $Loggable | undefined;
	let warningOutput: $Loggable | undefined;
	let errorOutput: $Loggable | undefined;
	let debugOutput: $Loggable | undefined;

	if ((output as iLoggerOutputs).defaultOutput) {
		defaultOutput = (output as iLoggerOutputs).defaultOutput;
		successOutput = (output as iLoggerOutputs).successOutput;
		infoOutput = (output as iLoggerOutputs).infoOutput;
		warningOutput = (output as iLoggerOutputs).warningOutput;
		errorOutput = (output as iLoggerOutputs).errorOutput;
		debugOutput = (output as iLoggerOutputs).debugOutput;
	} else {
		defaultOutput = output as $Loggable;
		successOutput =
			infoOutput =
			warningOutput =
			errorOutput =
			debugOutput =
				defaultOutput;
	}

	const logger: iLogger = (...args) => {
		if (!(defaultOutput as iFile).path) {
			return logToStream(
				defaultOutput as NodeJS.WriteStream,
				options,
				'default',
				args,
				logger.SYMBOL_MAP
			);
		}
		logToFile(
			defaultOutput as iFile,
			options,
			'default',
			args,
			logger.SYMBOL_MAP
		);
	};

	logger.SYMBOL_MAP = {
		default: symbols.default || '•',
		success: symbols.success || '✅',
		info: symbols.info || '🥁',
		warning: symbols.warning || '🚧',
		error: symbols.error || '❌',
		debug: symbols.debug || '🐞',
	};

	logger.success = genIndividualLogger(
		successOutput || defaultOutput,
		options,
		'success',
		logger.SYMBOL_MAP
	);

	logger.info = genIndividualLogger(
		infoOutput || defaultOutput,
		options,
		'info',
		logger.SYMBOL_MAP
	);

	logger.warning = genIndividualLogger(
		warningOutput || defaultOutput,
		options,
		'warning',
		logger.SYMBOL_MAP
	);

	logger.error = genIndividualLogger(
		errorOutput || defaultOutput,
		options,
		'error',
		logger.SYMBOL_MAP
	);

	logger.debug = genIndividualLogger(
		debugOutput || defaultOutput,
		options,
		'debug',
		logger.SYMBOL_MAP
	);

	return logger;
};
