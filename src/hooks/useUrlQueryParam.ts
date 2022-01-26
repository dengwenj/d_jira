/**
 * 返回页面 url 中，指定建的参数值
 */
import { useSearchParams } from 'react-router-dom'

export const useUrlQueryParam = (key: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams() // searchParams.get('name') 是拿到 url 上面键的值, setSearchParams 是修改 url 上面键的值

  return [
    key.reduce((pre, currentValue) => {
      return { ...pre, [currentValue]: searchParams.get(currentValue) || '' }
    }, {} as { [k in string]: string }),
    setSearchParams
  ] as const // 字面量推理，变成固定的类型了
}