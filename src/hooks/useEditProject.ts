import { useQueryClient, useMutation, useQuery } from 'react-query'

import { IProject } from 'types/project'
import { useHttp } from "utils/http"
import { useProjectsSearchParams } from 'srceens/project-list/utils'

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]

  return useMutation(
    (params: Partial<IProject>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }), {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey)
        queryClient.setQueryData(queryKey, (old?: IProject[]) => {
          return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
        })
        
        return {
          previousItems
        }
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: IProject[] }).previousItems)
      }
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