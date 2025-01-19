export const isObject = (obj: any) => {
  if (typeof obj === 'object' && obj !== null) {
    return '{}';
  } else {
    return '';
  }
};

export const isArray = (arr: any) => {
  if (Array.isArray(arr)) {
    return ' - (' + arr.length.toString() + ')';
  }
  return '';
};

export const isFunction = (func: any) => {
  return func && {}.toString.call(func) === '[object Function]';
};
