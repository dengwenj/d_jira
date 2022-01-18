const isFalsy = value => value === 0 ? false : !value

// 在一个函数里改变传入的对象是不好的，因为对象是引用类型，这里改变了，其他地方也要改变
export function clearObject(object) {
  const result = { ...object }

  Object.keys(result).forEach(key => {
    const value = result[key]

    if (isFalsy(value)) {
      delete result[key]
    }
  })

  return result
}