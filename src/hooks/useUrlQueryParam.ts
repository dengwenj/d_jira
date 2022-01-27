/**
 * 返回页面 url 中，指定建的参数值
 */
import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { clearObject } from 'utils';

export const useUrlQueryParam = <K extends string>(key: K[]) => {
  // searchParams.get('name') 是拿到 url 上面键的值, setSearchParams 是修改 url 上面键的值
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams);
  
  return [
    useMemo(() => {
      return key.reduce((pre, currentValue) => {
        return { ...pre, [currentValue]: searchParams.get(currentValue) || '' }
      }, {} as { [k in K]: string })
    }, [searchParams, key]),
    //  Object.fromEntries() 方法把键值对列表转换为一个对象。 Object.fromEntries() 执行与 Object.entries 互逆的操作。
    (params: {[k in K]: unknown}) => {
      // setSearchParams
      const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      setSearchParams(o)
    }
  ] as const // 字面量推理，变成固定的类型了
}




/**
 * function Children(){
      const [searchParams,setSearchParams]= useSearchParams();
      const changeSearchParams=()=>{
        setSearchParams({
            user:"郭芙蓉",
            skill:"排山倒海"
        })
        // 执行完之后 url=/detail?user=郭芙蓉&skill=排山倒海
        // 页面展示相关信息
      }
      return (
        <div>
          <div>
              姓名 ：{searchParams.get("user")}
              技能 ：{searchParams.get("skill")}
          </div>
          <button onClick={changeSearchParams}>修改</button>
        </div>
      )
    }
 */

