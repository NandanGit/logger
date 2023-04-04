export type $Loggable =
	| NodeJS.WriteStream
	| iFile
	| (iFile | NodeJS.WriteStream)[];

export interface iLoggerOptions {
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

export interface iLoggerOutputs {
	defaultOutput: $Loggable;
	successOutput?: $Loggable;
	infoOutput?: $Loggable;
	warningOutput?: $Loggable;
	errorOutput?: $Loggable;
	debugOutput?: $Loggable;
}

export type $SubLogger = (...args: any[]) => void;

export interface iLogger {
	(...args: any[]): void;
	success: $SubLogger;
	info: $SubLogger;
	warning: $SubLogger;
	error: $SubLogger;
	debug: $SubLogger;

	// Constants
	SYMBOL_MAP: iSymbolMap;
}

export interface iFile {
	path: string;
}

export type $LogType =
	| 'default'
	| 'success'
	| 'info'
	| 'warning'
	| 'error'
	| 'debug';

export interface iSymbolMap {
	default: string;
	success: string;
	info: string;
	warning: string;
	error: string;
	debug: string;
}
