export const max = (arr: number[]): number => {
  return arr.reduce((acc, cur) => {
    return acc > cur ? acc : cur;
  }, 0);
};

export const min = (arr: number[]): number => {
  return arr.reduce((acc, cur) => {
    return acc < cur ? acc : cur;
  });
};

export const sum = (arr: number[]): number => {
  return arr.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

export const avg = (arr: number[]): number => {
  const total = arr.reduce((acc, cur) => {
    return acc + cur;
  });
  return total / arr.length;
};

export const median = (arr: number[]): number => {
  const sorted = arr.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};
