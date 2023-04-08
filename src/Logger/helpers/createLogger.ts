import log from '../../utils/log';
import { $LogType, $Outputs, iLogger, iLoggerOptions } from '../types';
import { getSubLogger } from './getSubLogger';

export const createLogger = (
  outputs: $Outputs,
  options: iLoggerOptions
): iLogger => {
  // log(outputs, options);
  const logger = getSubLogger(
    outputs.default,
    options,
    'default'
    // logger.SYMBOL_MAP
  ) as iLogger;

  for (const key in outputs) {
    // console.log(key);
    logger[key] = getSubLogger(
      outputs[key as $LogType],
      options,
      key as $LogType
    );
  }

  return logger;
};
