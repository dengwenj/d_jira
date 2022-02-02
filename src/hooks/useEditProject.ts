import { useQueryClient, useMutation, useQuery } from 'react-query' 

import { IProject } from "srceens/project-list/list"
import { useHttp } from "utils/http"

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<IProject>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}


export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<IProject>) => client(`projects`, {
      data: params,
      method: 'POST'
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<IProject>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}