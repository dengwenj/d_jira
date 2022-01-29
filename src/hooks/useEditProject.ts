import { IProject } from "srceens/project-list/list"
import { useHttp } from "utils/http"
import { useAsync } from "./useAsync"

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const cline = useHttp()

  const mutate = (params: Partial<IProject>) => {
    return run(cline(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const cline = useHttp()

  const mutate = (params: Partial<IProject>) => {
    return run(cline(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}