import React from 'react'
import styled from '@emotion/styled'
import { Spin } from 'antd'

import useDocumentTitle from 'hooks/useDocumentTitle'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './utils'
import { useKanbans } from 'utils/kanban'
import KanbanColumn from './kanban-column'
import SearchPanel from './search-panel'
import { ScreenContainer } from 'components/lab'
import { useTasks } from 'utils/task'
import CreateKanban from './create-kanban'

export default function KanBan() {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? <Spin size='large' /> : <ColumnsContainer>
        {
          kanbans?.map(kanban => {
            return <KanbanColumn kanban={kanban} key={kanban.id} />
          }) 
        }
      </ColumnsContainer>} 
      <CreateKanban />
    </ScreenContainer>
  )
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
