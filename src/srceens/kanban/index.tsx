import React from 'react'
import styled from '@emotion/styled'

import useDocumentTitle from 'hooks/useDocumentTitle'
import { useKanbanSearchParams, useProjectInUrl } from './utils'
import { useKanbans } from 'utils/kanban'
import KanbanColumn from './kanban-column'

export default function KanBan() {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {
          kanbans?.map(kanban => {
            return <KanbanColumn kanban={kanban} key={kanban.id} />
          })
        }
      </ColumnsContainer>
    </div>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
