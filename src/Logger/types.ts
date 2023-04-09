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

export interface iFileOutputOptions extends iLoggerOptions {
  clearOnStart?: boolean;
}
export interface iFileOutput {
  type: 'FILE';
  path: string;
  target: NodeJS.WriteStream;
  options: iFileOutputOptions;
}

export interface iTerminalOutputOptions extends iLoggerOptions {}
export interface iTerminalOutput {
  type: 'STD_OUT' | 'STD_ERR';
  target: NodeJS.WriteStream;
  options: iTerminalOutputOptions;
}

export type $Output = iFileOutput | iTerminalOutput;

export type $Outputs = {
  [key in $LogType]: $Output | $Output[];
};

export interface iLoggerOptions {
  loggerName?: string;
  processArgs?: boolean;
  argProcessor?: (arg: any) => string;

  // Formatting options
  //// Name
  showName?: boolean;
  useBracketsForName?: boolean;
  nameFormatter?: (name: string, options: iLoggerOptions) => string;

  //// Time
  showTime?: boolean;
  timeFormatter?: (time: Date, options: iLoggerOptions) => string;

  //// Line ending
  newLine?: boolean;
  lineEnding?: string;

  //// Colors
  colorize?: boolean;

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

export interface iFileOutputArg {
  type: 'FILE';
  path: string;
  options?: iFileOutputOptions;
}

export interface iTerminalOutputArg {
  type: 'STD_OUT' | 'STD_ERR';
  target: NodeJS.WriteStream;
  options?: iTerminalOutputOptions;
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
