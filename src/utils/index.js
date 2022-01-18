import { useEffect, useState } from "react"

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

/* 
  自定义 Hook
      useMount、useDebounce
*/
export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value)
    }, delay);

    // 每次在上一个 useEffect 处理完以后再运行
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounce
}