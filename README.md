# Logger

`Logger` is a Node.js package for logging information with various formatting options. The package provides a simple interface to create a logger with different log levels like `debug`, `info`, `success`, `warning`, and `error`. Each level has a specific color and symbol to visually differentiate them. The logger can write to files, streams, or an array of files and streams.

## Installation

You can install `Logger` via NPM by running the following command

```bash
npm i @nandn/logger --save-dev
```

## Usage

The `Logger` package exports a `createLogger` function that you can use to create a new logger instance. The `createLogger` function takes two optional arguments:

- `output` (type: `$Loggable | iLoggerOutputs`): This argument specifies where the logs will be written. It can be a stream, file, array of streams or files, or an object that maps log types to streams or files.
- `options` (type: `iLoggerOptions`): This argument specifies various formatting options for the logger.

### Example

```javascript
import { createLogger } from '@nandn/logger';

// Create a logger instance that logs to the console
const Log = createLogger();

// Log some information
Log('Hello, world!'); // outputs "Hello, world!"

// Log some success information
Log.success('Operation succeeded!'); // outputs "✅ Operation succeeded!"

// Log some debug information
Log.debug('Some debug info'); // outputs "🐞 Some debug info"
```

## Options

| Option               | Type       | Default          | Description                                                                                                                                              |
| -------------------- | ---------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loggerName`         | `string`   | `'Logger'`       | The name of the logger. This is used to prefix the log messages.                                                                                         |
| `processArgs`        | `boolean`  | `false`          | Whether to process the arguments passed to the logger. If set to `true`, the logger will process the arguments passed to it and format them accordingly. |
| `argsProcessor`      | `function` | `JSON.stringify` | A function that processes the arguments passed to the logger. This function is called only if `processArgs` is set to `true`.                            |
| `newLine`            | `boolean`  | `true`           | Whether to add a new line after each log message.                                                                                                        |
| `lineEnding`         | `string`   | `'\n'`           | The line ending to use.                                                                                                                                  |
| `showSymbol`         | `boolean`  | `true`           | Whether to show the log symbol.                                                                                                                          |
| `spaceAfterSymbol`   | `boolean`  | `true`           | Whether to add a space after the log symbol.                                                                                                             |
| `showName`           | `boolean`  | `true`           | Whether to show the logger name.                                                                                                                         |
| `loggerName`         | `string`   | `'Logger'`       | The name of the logger. This is used to prefix the log messages.                                                                                         |
| `useBracketsForName` | `boolean`  | `true`           | Whether to use brackets to enclose the logger name.                                                                                                      |
| `nameFormatter`      | `function` | `name => name`   | A function that formats the logger name.                                                                                                                 |
| `symbols`            | `object`   | `{}`             | An object that maps log types to symbols.                                                                                                                |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
