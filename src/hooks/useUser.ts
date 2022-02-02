import { useEffect } from "react";
import { IUser } from "types/user";
import { clearObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

type R = Record<string, number>

export const useUser = (params?: Partial<IUser>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IUser[]>()

  useEffect(() => {
    run(client('users', { data: clearObject(params || {}) }))
    // eslint-disable-next-line
  }, [params])

  return result
} 

interface Person {
  name: string,
  age: number
}

const title = <T extends Person>(params: T) => {
  console.log(params.name); // 类型“T”上不存在属性“name”，这样会报错 来个约束<T extends Person>
}

title<Person>({
  name: 'ffffff',
  age: 2222
})
