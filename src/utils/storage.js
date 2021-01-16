// 封装本地存储操作模块
// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};
// 获取数据
// 删除数据
