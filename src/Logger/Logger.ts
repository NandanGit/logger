import genIndividualLogger from '../helpers/genIndividualLogger';
import logToFile from '../helpers/logToOutput/logToFile';
import logToStream from '../helpers/logToOutput/logToStream';
import {
  $Loggable,
  iLoggerOptions,
  iLoggerOutputs,
  iLogger,
  iFile,
  $LogType,
  $SubLogger,
} from './types';

export const createLogger = (
  output: $Loggable | iLoggerOutputs,
  options: iLoggerOptions
): iLogger => {
  const { symbols = {} } = options;
  const outputs: iLoggerOutputs = {
    default: undefined as any,
    success: undefined,
    info: undefined,
    warning: undefined,
    error: undefined,
    debug: undefined,
  };

  if ((output as iLoggerOutputs).default) {
    outputs.default = (output as iLoggerOutputs).default;
    outputs.success = (output as iLoggerOutputs).success;
    outputs.info = (output as iLoggerOutputs).info;
    outputs.warning = (output as iLoggerOutputs).warning;
    outputs.error = (output as iLoggerOutputs).error;
    outputs.debug = (output as iLoggerOutputs).debug;
  } else {
    outputs.default = output as $Loggable;
    outputs.success = outputs.default;
    outputs.info = outputs.default;
    outputs.warning = outputs.default;
    outputs.error = outputs.default;
    outputs.debug = outputs.default;
  }

  const logger: iLogger = (...args) => {
    const outputsArr = Array.isArray(outputs.default)
      ? outputs.default
      : [outputs.default];
    console.log(outputsArr.map((elem) => typeof elem));
    // return;
    outputsArr.forEach((output) => {
      if (!(output as iFile).path) {
        return logToStream(
          output as NodeJS.WriteStream,
          options,
          'default',
          args,
          logger.SYMBOL_MAP
        );
      }
      logToFile(output as iFile, options, 'default', args, logger.SYMBOL_MAP);
    });
  };

  logger.SYMBOL_MAP = {
    default: symbols.default || '••',
    success: symbols.success || '✅',
    info: symbols.info || '🥁',
    warning: symbols.warning || '🚧',
    error: symbols.error || '❌',
    debug: symbols.debug || '🐞',
  };

  // iterate through the outputs and create the SubLoggers
  logger.default = undefined as any as $SubLogger;
  logger.success = undefined as any as $SubLogger;
  logger.info = undefined as any as $SubLogger;
  logger.warning = undefined as any as $SubLogger;
  logger.error = undefined as any as $SubLogger;
  logger.debug = undefined as any as $SubLogger;

  for (const key in outputs) {
    // console.log(key);
    logger[key] = genIndividualLogger(
      outputs[key] || outputs.default,
      options,
      key as $LogType,
      logger.SYMBOL_MAP
    );
  }

  return logger;
};
