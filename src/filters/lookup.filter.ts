export const lookup = (value: any, propertyName: string = 'descricao') => {
  return value ? value[propertyName] : value;
};
