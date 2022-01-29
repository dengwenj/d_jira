import { useEffect } from "react"
import { IProject } from "srceens/project-list/list"
import { clearObject } from "utils"
import { useHttp } from "utils/http"
import { useAsync } from "./useAsync"

export const useProjects = (params?: Partial<IProject>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<IProject[]>()

  const fetchProject = () => client('projects', { data: clearObject(params || {}) })

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject
    })
    // eslint-disable-next-line
  }, [params])

  return result
}