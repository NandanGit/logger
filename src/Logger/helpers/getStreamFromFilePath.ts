import fs from 'fs';
import path from 'path';
import { iFileOutputOptions, iFileOutputTarget } from '../types';
import { resolvePeriod } from './resolvePeriod';
import {
  DEFAULT_FILE_NAME_FORMATTER,
  DEFAULT_PERIOD_START,
} from '../../constants';
import { formatTime } from '../../utils/time';

export interface iCreateStreamOutput {
  stream: NodeJS.WriteStream;
  expiresAt: Date | null;
}

const createStream = (
  filePath: string,
  options: iFileOutputOptions,
  isPeriodic: boolean
): iCreateStreamOutput => {
  // Declarations
  // console.log('getStreamFromFilePath', filePath, options);
  const { clearOnStart = false, showFileClearStatus = true } = options;
  let stream: NodeJS.WriteStream;
  let expiresAt: Date | null = null;
  // Check if directory exists
  const dirPath = isPeriodic ? filePath : path.dirname(filePath);
  console.log('dirPath', dirPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (isPeriodic) {
    const {
      period = 3600000,
      periodStart = DEFAULT_PERIOD_START,
      fileNameFormatter = DEFAULT_FILE_NAME_FORMATTER,
      takeFullNameFromFileNameFormatter = false,
      takeExtensionFromFileNameFormatter = true,
    } = options;
    const { localStart, localEnd } = resolvePeriod(period, periodStart);
    expiresAt = localEnd;
    let fileName: string;
    if (typeof fileNameFormatter === 'string') {
      fileName = `${formatTime(localStart, fileNameFormatter)} - ${formatTime(
        localEnd,
        fileNameFormatter
      )}.log`;
    } else {
      if (takeFullNameFromFileNameFormatter) {
        fileName =
          fileNameFormatter(localStart, localEnd) +
          (takeExtensionFromFileNameFormatter ? '.log' : '');
      } else {
        fileName = `${fileNameFormatter(
          localStart,
          localEnd
        )} - ${fileNameFormatter(localEnd, localStart)}.log`;
      }
    }
    filePath = path.join(dirPath, fileName);
  }

  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    fs.writeFileSync(filePath, '');
    if (showFileClearStatus) console.log(`Created ${filePath}.`);
  }

  stream = fs.createWriteStream(filePath, {
    flags: clearOnStart ? 'w' : 'a',
  }) as any as NodeJS.WriteStream;

  if (fileExists && clearOnStart) {
    if (showFileClearStatus) console.log(`Cleared ${filePath}.`);
  }

  return { stream, expiresAt };
};

export const getStreamFromFilePath = (
  filePath: string,
  options: iFileOutputOptions = {}
): iFileOutputTarget => {
  // console.log('getStreamFromFilePath', filePath, options);
  // Check if the file output should be periodic
  let stream: NodeJS.WriteStream;
  let expiresAt: Date | null = null;
  if (options.periodic) {
    console.log('Periodic');
    const streamResponse = createStream(filePath, options, true);
    stream = streamResponse.stream;
    expiresAt = streamResponse.expiresAt as Date;
  } else {
    console.log('Not periodic');
    const streamResponse = createStream(filePath, options, false);
    stream = streamResponse.stream;
  }

  const updateStream = () => {
    console.log('Updating stream');
    const streamResponse = createStream(filePath, options, true);
    result.stream = streamResponse.stream;
    result.expiresAt = streamResponse.expiresAt as Date;
  };

  const result: iFileOutputTarget = {
    stream,
    updateStream,
    expiresAt,
  };

  return result;
};
