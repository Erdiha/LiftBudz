export function capitalizeWords(str: string) {
  return str.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
}

export const sorting = (arr: any, type: string, order: string) => {
  const sorted = arr?.sort((a: any, b: any) => {
    if (type === 'name') {
      const A =
        order === 'asc'
          ? a?.userName?.toLowerCase()
          : b?.userName?.toLowerCase();
      const B =
        order === 'asc'
          ? b?.userName?.toLowerCase()
          : a?.userName?.toLowerCase();
      return A < B ? -1 : A > B ? 1 : 0;
    } else if (type === 'comment') {
      return order === 'desc'
        ? b.timeStamp - a.timeStamp
        : a.timeStamp - b.timeStamp;
    }
  });

  return sorted;
};
