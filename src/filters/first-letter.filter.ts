import _ from 'lodash';

export const firstLetter = (value: string) => {
  if (!value || !value.trim()) {
    return value;
  }

  return _.upperFirst(value.trim()).charAt(0);
};
