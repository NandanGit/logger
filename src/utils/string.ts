import { COLOR_MAP } from '../constants';

export const colorize = (
  string: string,
  color: string,
  end: string = 'default'
) => {
  return (COLOR_MAP as any)[color] + string + (COLOR_MAP as any)[end];
};

export const reduceColorsInString = (string: string, end: string): string => {
  const regex = /(\w+\{[^{}]+\})/g;
  const result = string.replace(regex, (match: string) => {
    let [color, content] = match.split('{');
    content = content.slice(0, -1);
    // console.log(color, colorize(content, color), 'Yes yes yes');
    // return colorize(`Test ${colorize(content, color, 'error')}`, 'error');
    return colorize(content, color, end);
  });
  // console.log(result);
  return result;
};
