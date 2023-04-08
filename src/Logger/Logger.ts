import { createLogger } from './helpers/createLogger';
import { processOutput } from './helpers/processOutput';
import { isValidOutputs } from './typeGuards';
import { $Output, $Outputs, $OutputsArg, iLoggerOptions } from './types';

function createLoggerArgCleaner(
  OutputsOrOptions?: $OutputsArg | iLoggerOptions,
  options?: iLoggerOptions
) {
  const args = arguments;
  const defaultOutput: $Output = {
    type: 'STD_OUT',
    target: process.stdout,
    options: {},
  };
  const defaultOutputs: $Outputs = {
    default: defaultOutput,
    success: defaultOutput,
    info: defaultOutput,
    warning: defaultOutput,
    error: defaultOutput,
    debug: defaultOutput,
  };
  switch (args.length) {
    case 0: {
      return createLogger(defaultOutputs, {});
    }
    case 1: {
      if (args[0] === 'console') {
        return createLogger(defaultOutputs, {});
      }
      if (isValidOutputs(args[0])) {
        const outputs = args[0];
        const processedDefault = processOutput(outputs.default, defaultOutput);
        return createLogger(
          {
            default: processedDefault,
            success: processOutput(outputs.success, processedDefault),
            info: processOutput(outputs.info, processedDefault),
            warning: processOutput(outputs.warning, processedDefault),
            error: processOutput(outputs.error, processedDefault),
            debug: processOutput(outputs.debug, processedDefault),
          },
          {}
        );
      }
      return createLogger(defaultOutputs, args[0]);
    }
    case 2: {
      if (isValidOutputs(args[0])) {
        const outputs = args[0];
        const processedDefault = processOutput(outputs.default, defaultOutput);
        return createLogger(
          {
            default: processedDefault,
            success: processOutput(outputs.success, processedDefault),
            info: processOutput(outputs.info, processedDefault),
            warning: processOutput(outputs.warning, processedDefault),
            error: processOutput(outputs.error, processedDefault),
            debug: processOutput(outputs.debug, processedDefault),
          },
          args[1]
        );
      }
    }
    default:
      throw new Error('Invalid number of arguments, expected 0, 1 or 2');
  }
}

export { createLoggerArgCleaner as createLogger };
