/**
 * 返回页面 url 中，指定建的参数值
 */
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useUrlQueryParam = <K extends string>(key: K[]) => {
  // searchParams.get('name') 是拿到 url 上面键的值, setSearchParams 是修改 url 上面键的值
  const [searchParams, setSearchParams] = useSearchParams()

  return [
    useMemo(() => {
      return key.reduce((pre, currentValue) => {
        return { ...pre, [currentValue]: searchParams.get(currentValue) || '' }
      }, {} as { [k in K]: string })
    }, [searchParams, key]),
    setSearchParams
  ] as const // 字面量推理，变成固定的类型了
}