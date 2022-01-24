import { useEffect } from "react";
import { IUser } from "srceens/project-list/search";
import { clearObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "./useAsync";

export const useUser = (params?: Partial<IUser>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IUser[]>()

  useEffect(() => {
    run(client('users', { data: clearObject(params || {}) }))
    // eslint-disable-next-line
  }, [params])

  return result
} 