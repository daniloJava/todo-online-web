export const normalize = (value: string, type: string = 'text') => {
  if (!value) {
    return value;
  }

  if ('text' === type) {
    return normalizeText(value);
  }

  return value;
};

function normalizeText(value: string) {
  const capitalize = (sentence: string): string => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  let text = '';
  const lower = value.trim().toLowerCase();
  const sentences = lower.split('. ');
  sentences.forEach((sentence: string): void => {
    text = text + '. ' + capitalize(sentence);
  });

  return sentences.length > 0 ? text.slice(2) : capitalize(lower);
}
