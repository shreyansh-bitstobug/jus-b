export const removeSlash = (str: string) => {
  return str.charAt(0) === "/" ? str.slice(1) : str;
};
