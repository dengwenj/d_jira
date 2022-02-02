import { useEffect } from "react"
import { useQuery } from 'react-query'

import { IProject } from "types/project"
import { clearObject } from "utils"
import { useHttp } from "utils/http"
import { useAsync } from "./useAsync"

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IProject[]>()

  const fetchProject = () => client('projects', { data: clearObject(param || {}) })

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject
    })
    // eslint-disable-next-line
  }, [param])
 
  return result

  // return useQuery<IProject[], Error>(['projects', params], () => client('projects', { data: params }))
  // return useQuery<IProject[]>(["projects", clearObject(param || {})], () =>
  //   client("projects", { data: param })
  // );
}