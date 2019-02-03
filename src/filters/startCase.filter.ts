import _ from 'lodash';

export const startCase = (value: string) => {
  if (!value) {
    return value;
  }

  const capitalize = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  let text = '';
  const lower = value.trim().toLowerCase();
  const words = lower.split(' ');

  words.forEach((word: string): void => {
    text = text + ' ' + capitalize(word);
  });

  return text;
};
