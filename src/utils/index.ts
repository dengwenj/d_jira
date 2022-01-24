import { useEffect, useState } from "react"

// unknown 只能赋值给 any 和 unknown，unknown 类型上不能读取方法
const isFalsy = (value: unknown) => value === 0 ? false : !value

// 在一个函数里改变传入的对象是不好的，因为对象是引用类型，这里改变了，其他地方也要改变
export function clearObject(object: { [key: string]: unknown }) {
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
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line
  }, []) // 添加了 eslint-disable-next-line 这个就把有些规则关闭掉了
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

export const useArray = <T>(person: T[]) => { // 自动推导
  const [value, setValue] = useState(person)

  return {
    value,
    add(item: T) {
      setValue([item, ...value])
    },
    clear() {
      setValue([])
    },
    removeIndex(index: number) {
      const copy = [...value]
      // splice 会改变原数组
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}