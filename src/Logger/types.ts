// export interface iOutput {
//   type: 'FILE' | 'STD_OUT'
// }
export type $LogType =
  | 'default'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'debug';

export interface iFileOptions extends iLoggerOptionsBase {
  clearOnStart?: boolean;
  periodic?: boolean;
  period?: number;
  periodStart?: Date;
  periodEnd?: Date;
  fileNameFormatter?: string | ((localStart: Date, localEnd: Date) => string);
  takeFullNameFromFileNameFormatter?: boolean;
  takeExtensionFromFileNameFormatter?: boolean;
}

export interface iFileOutputTarget {
  stream: NodeJS.WriteStream;
  updateStream: () => void;
  expiresAt: Date | null;
}
export interface iFileOutput {
  type: 'FILE';
  path: string;
  target: iFileOutputTarget;
  options: iFileOptions;
}

export interface iTerminalOptions extends iLoggerOptionsBase {
  // Colors
  colorize?: boolean;
  reduceColors?: boolean;
}
export interface iTerminalOutput {
  type: 'STD_OUT' | 'STD_ERR';
  target: NodeJS.WriteStream;
  options: iTerminalOptions;
}

export interface iLoggerOptions extends iTerminalOptions, iFileOptions {}

export type $Output = iFileOutput | iTerminalOutput;

export type $Outputs = {
  [key in $LogType]: $Output | $Output[];
};

export interface iLoggerOptionsBase {
  loggerName?: string;
  processArgs?: boolean;
  argProcessor?: (arg: any) => string;

  showFileClearStatus?: boolean; // Informs the user if a file was cleared on start

  // Formatting options
  //// Name
  showName?: boolean;
  useBracketsForName?: boolean;
  nameFormatter?: (name: string, options: iLoggerOptions) => string;
  spaceAfterName?: boolean;

  //// Time
  showTime?: boolean;
  timeFormatter?: string | ((time: Date, options: iLoggerOptions) => string);
  useBracketsForTime?: boolean;
  spaceAfterTime?: boolean;

  //// Line ending
  newLine?: boolean;
  lineEnding?: string;

  //// Symbols
  showSymbol?: boolean;
  symbol?: string;
  symbols?: {
    [key in $LogType]?: string;
  };
  spaceAfterSymbol?: boolean;

  // File options
  clearOnStart?: boolean;
}

export type $SubLogger = (...args: any[]) => void;

export interface iLogger {
  (...args: any[]): void;
  default: $SubLogger;
  success: $SubLogger;
  info: $SubLogger;
  warning: $SubLogger;
  error: $SubLogger;
  debug: $SubLogger;

  // Constants
  SYMBOL_MAP: $SymbolMap;

  // To prevent typescript errors
  [key: string]: any;
}

export type $SymbolMap = {
  [key in $LogType]: string;
};

export interface iFileOutputOptionsArg extends Omit<iFileOptions, 'period'> {
  period?: number | string;
}
export interface iFileOutputArg {
  type: 'FILE';
  path: string;
  options?: iFileOutputOptionsArg;
}

export interface iTerminalOutputArg {
  type: 'STD_OUT' | 'STD_ERR';
  target: NodeJS.WriteStream;
  options?: iTerminalOptions;
}

export type $OutputArg =
  | 'console'
  | string
  | NodeJS.WriteStream
  | (iTerminalOutputArg | iFileOutputArg)
  | (
      | string
      | NodeJS.WriteStream
      | (iTerminalOutputArg | iFileOutputArg)
      | 'console'
    )[];

export type $OutputsArg = $OutputArg | { [key in $LogType]?: $OutputArg };
