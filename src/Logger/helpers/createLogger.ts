import { $Outputs, iLoggerOptions, iTerminalOutput } from '../types';

export const createLogger = (
  outputs: $Outputs,
  options: iLoggerOptions
): void => {
  // Only for logging
  const outputsCopy = { ...outputs };
  for (const key in outputsCopy) {
    const output = outputsCopy[key];
    if (Array.isArray(output)) {
      // output.forEach((o, ind) => {
      //   output[ind] = o; //console.log(`output ${key} ${ind}:`, o);
      // });
      for (let i = 0; i < output.length; i++) {
        if (output[i].type === 'STD_OUT' || output[i].type === 'STD_ERR') {
          (output[i] as iTerminalOutput).target = 'This is a Stream' as any;
        }
      }
    } else {
      if (output.type === 'STD_OUT' || output.type === 'STD_ERR') {
        (output as iTerminalOutput).target = 'This is a Stream' as any;
      }
    }
  }
  console.log('outputs:', outputsCopy);
  console.log('options:', options);

  // Start from here
};
