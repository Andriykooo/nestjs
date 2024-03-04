export const convertStringToNumber = (string: string): number => {
  const num = Number(string);
  return isNaN(num) ? null : num;
};
