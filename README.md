# Logger

`Logger` is a Node.js package for logging information with various formatting options. The package provides a simple interface to create a logger with different log levels like `debug`, `info`, `success`, `warning`, and `error`. Each level has a specific color and symbol to visually differentiate them. The logger can write to files, streams, or an array of files and streams.

## Installation

You can install `Logger` via NPM by running the following command

```bash
npm i @nandn/logger --save-dev
```

## Usage# Logger

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

### Example - STDOUT

```js
import { createLogger } from '@nandn/logger'; // const { createLogger } = require('@nandn/logger') // for CommonJS system

// Create a logger instance that logs to the console
const Log = createLogger();

// Log some information
Log('Hello, world!'); // outputs "Hello, world!"

// Log some success information
Log.success('Operation succeeded!'); // outputs "✅ Operation succeeded!" (will be in green color once logged in terminal)

// Log some debug information
Log.debug('Some debug info'); // outputs "🐞 Some debug info" (will be in purple color once logged in terminal)
```

### Example - FILES

```js
import { createLogger } from '@nandn/logger'; // const { createLogger } = require('@nandn/logger') // for CommonJS system
import path from 'path'; // const path = require('path') // for CommonJS system

const Log = createLogger(
  {
    success: {
      type: 'FILE',
      path: path.join(__dirname, './logs/success-logs.log'),
    },
    error: {
      type: 'FILE',
      path: path.join(__dirname, './logs/error-logs.log'),
      options: {
        // the following options applies to only this perticular output and will take precedence over general options
        showTime: false, // showTime will be false for this output whereas it  will stay true for the rest of the outputs as it is true in general options
        showSymbol: false,
      },
    },
  },
  {
    // general options (applies to all the outputs)
    showTime: true,
  }
);

// Log a success message
Log.success('This is a success log'); // [Logger] [Wed Apr 12 2023] ✅ This is a success log // This will be logged to `./logs/success-logs.log`

// Log a failure message
Log.error('This is an error log'); // [Logger] This is an error log // this will be logged to `./logs/error-logs.log`

// Export the logger instance to make it available for the whole project
export default Log; // module.exports = Log // for CommonJS system
```

### Example - BOTH and Periodic File logging

```js
import { createLogger } from '@nandn/logger'; // const { createLogger } = require('@nandn/logger') // for CommonJS system
import path from 'path'; // const path = require('path') // for CommonJS system

const Log = createLogger({
  // Pass an array to specify multiple outputs
  success: [
    process.stdout, // You can also use 'console' as a short hand to process.stdout
    { type: 'FILE', path: path.join(__dirname, './logs/success-logs-1.log') },
    { type: 'FILE', path: path.join(__dirname, './logs/success-logs-2.log') }, // You can pass as many outputs as you want
  ],
  error: [
    { type: 'STD_OUT', target: process.stdout, options: { colorize: false } }, // If you want to pass options to an STDOUT, you have to use the STD_OUT type
    {
      type: 'FILE',
      path: path.join(__dirname, './logs/error-logs'),
      options: {
        periodic: true, // If periodic is set to true, the logger will create a new file every `period`
        period: '10 min', // The period can be specified in days, hours, minutes ('1d', '2h', '30m', '4 days', '13 hrs', '2 minutes', '1hr 4min', '1d 2h 30m', etc. are all valid periods)
        // period: 3600000, // You can also pass the period in milliseconds (in this case you have to pass period as a number instead of a string)
      },
    },
  ],
});

// Log a success message
Log.success('This is a success log');
/*
[Logger] ✅ This is a success log                     // This will be logged to STDOUT in green color
[Logger] [Wed Apr 12 2023] ✅ This is a success log   // This will be logged to `./logs/success-logs-1.log`
[Logger] [Wed Apr 12 2023] ✅ This is a success log   // This will be logged to `./logs/success-logs-2.log`
*/

// Log a failure message
Log.error('This is an error log');
/*
[Logger] ❌ This is an error log                      // This will be logged to STDOUT without any color (as colorize is set to false for this perticular output)
[ERROR] [Wed Apr 12 2023] This is an error log        // this will be logged to `./logs/error-logs/12-4-2023 23.40.00 - 12-4-2023 23.50.00.log`

Every thing logged in between '12-4-2023 23.40.00' and '12-4-2023 23.50.00' will be logged to the same file
If you try to log something just after that period, a new file will be created, which will be named as '12-4-2023 23.50.00 - 13-4-2023 00.00.00.log'
If you don't log anything for let's say 3 hrs, no files will be created in that time period
*/
// Export the logger instance to make it available for the whole project
export default Log; // module.exports = Log // for CommonJS system
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
| `useBracketsForName` | `boolean`  | `true`           | Whether to use brackets to enclose the logger name.                                                                                                      |
| `nameFormatter`      | `function` | `name => name`   | A function that formats the logger name.                                                                                                                 |
| `symbols`            | `object`   | `{}`             | An object that maps log types to symbols.                                                                                                                |

### Advanced Usage

[Click here](https://github.com/NandanGit/logger/blob/main/docs/ADVANCED_USAGE.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
