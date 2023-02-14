export const capitalFirstLetter = (str: string | null) => {
  return str
    ?.split(' ')
    .map((word: any) => word[0])
    .join('');
};
