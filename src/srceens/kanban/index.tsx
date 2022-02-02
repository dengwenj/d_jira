import React from 'react'
import styled from '@emotion/styled'

import useDocumentTitle from 'hooks/useDocumentTitle'
import { useKanbanSearchParams, useProjectInUrl } from './utils'
import { useKanbans } from 'utils/kanban'
import KanbanColumn from './kanban-column'
import SearchPanel from './search-panel'
import { ScreenContainer } from 'components/lab'

export default function KanBan() {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {
          kanbans?.map(kanban => {
            return <KanbanColumn kanban={kanban} key={kanban.id} />
          }) 
        }
      </ColumnsContainer>
    </ScreenContainer>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
