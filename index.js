// Так как функция возвращает объекты с принципиально разными значениями ключей,
// логично предположить что структура объекта задается входящим параметром assert

const func = (data, assert) => {
  if (!Array.isArray(data) || typeof assert !== 'object') {
    return {};
  }

  const keys = Object.keys(assert);
  const result = {};

  keys.forEach((key) => {
    result[key] = [];
  });

  const checkItem = (item) => {
    keys.forEach((key) => {
      if (typeof assert[key] === 'function' && assert[key](item)) {
        result[key].push(item);
      }
    });
  };

  data.forEach(checkItem);

  return result;
};

let data = [123, '123', '321', () => {}, 9000, {}, []];
let assert = {
  number: (item) => typeof item === 'number',
  string: (item) => typeof item === 'string',
  function: (item) => typeof item === 'function',
  object: (item) => typeof item === 'object',
};

console.log(func(data, assert));

data = ['123', '1', 'Hello!', ''];
assert = {
  more: (item) => typeof item === 'string' && item.length > 1,
  less: (item) => typeof item === 'string' && item.length <= 1,
};

console.log(func(data, assert));
