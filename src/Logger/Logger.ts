type $Loggable = NodeJS.WriteStream | iFile | (iFile | NodeJS.WriteStream)[];

interface iLoggerOptions {
	name: string;
	dateFormat?: string;
	processArgs?: boolean;
	argProcessor?: (arg: any) => string;

	// Formatting options
	showSymbol?: boolean;
	newLine?: boolean;
	lineEnding?: string;

	// // Symbols
	symbols?: {
		default?: string;
		success?: string;
		info?: string;
		warning?: string;
		error?: string;
		debug?: string;
	};
	spaceAfterSymbol?: boolean;
}

interface iLoggerOutputs {
	defaultOutput: $Loggable;
	successOutput?: $Loggable;
	infoOutput?: $Loggable;
	warningOutput?: $Loggable;
	errorOutput?: $Loggable;
	debugOutput?: $Loggable;
}

type $SubLogger = (...args: any[]) => void;

interface iLogger {
	(...args: any[]): void;
	success: $SubLogger;
	info: $SubLogger;
	warning: $SubLogger;
	error: $SubLogger;
	debug: $SubLogger;

	// Constants
	SYMBOL_MAP: iSymbolMap;
}

interface iFile {
	path: string;
}

type $LogType = 'default' | 'success' | 'info' | 'warning' | 'error' | 'debug';

const COLOR_MAP = {
	default: '\x1b[0m',
	success: '\x1b[32m',
	info: '\x1b[34m',
	warning: '\x1b[33m',
	error: '\x1b[31m',
	debug: '\x1b[35m',
};

interface iSymbolMap {
	default: string;
	success: string;
	info: string;
	warning: string;
	error: string;
	debug: string;
}

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

const logToFile = (
	file: iFile,
	options: iLoggerOptions,
	logType: $LogType,
	args: any[],
	SYMBOL_MAP: iSymbolMap
) => {
	console.log('logging to file:', file, ...args, `[${logType}]`);
};

const _genIndividualLogger = (
	output: $Loggable,
	options: iLoggerOptions,
	logType: $LogType,
	SYMBOL_MAP: iSymbolMap
): $SubLogger => {
	return (...args) => {
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
	};
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

	logger.success = _genIndividualLogger(
		successOutput || defaultOutput,
		options,
		'success',
		logger.SYMBOL_MAP
	);

	logger.info = _genIndividualLogger(
		infoOutput || defaultOutput,
		options,
		'info',
		logger.SYMBOL_MAP
	);

	logger.warning = _genIndividualLogger(
		warningOutput || defaultOutput,
		options,
		'warning',
		logger.SYMBOL_MAP
	);

	logger.error = _genIndividualLogger(
		errorOutput || defaultOutput,
		options,
		'error',
		logger.SYMBOL_MAP
	);

	logger.debug = _genIndividualLogger(
		debugOutput || defaultOutput,
		options,
		'debug',
		logger.SYMBOL_MAP
	);

	return logger;
};
