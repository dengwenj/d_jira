import { useEffect, useState } from "react"

// unknown 只能赋值给 any 和 unknown，unknown 类型上不能读取方法
const isFalsy = (value: unknown) => value === 0 ? false : !value

// 在一个函数里改变传入的对象是不好的，因为对象是引用类型，这里改变了，其他地方也要改变
export function clearObject<T>(object: T) {
  const result = { ...object }

  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key]

    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key]
    }
  })

  return result
}

/* 
  自定义 Hook
      useMount、useDebounce
*/
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
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