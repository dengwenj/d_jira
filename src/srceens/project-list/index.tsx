import React from 'react'
import styled from '@emotion/styled'

import { useDebounce } from 'utils'
import List from './list'
import Search from './search'
import { useProjects } from 'hooks/useProject'
import { Typography } from 'antd'
import { useUser } from 'hooks/useUser'
import useDocumentTitle from 'hooks/useDocumentTitle' 
import { useProjectsSearchParams } from './utils'
import { ButtonNoPadding } from 'components/lab'
import useProjectModal from 'hooks/useProjectModal'
import { ErrorBox } from 'components/lab'

export default function Index() {
  /**
   * 基本类型可以放在依赖里，组件里的状态可以放在依赖里，非组件状态的对象类型不可以放在依赖里
   */
  useDocumentTitle('项目列表', false)
  
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUser()
  const { open } = useProjectModal()
 
  return (
    <Container>
      <HeaderInfo>
        <h1>项目列表</h1>
        <ButtonNoPadding type='link' onClick={open}>
          创建项目
        </ButtonNoPadding>
      </HeaderInfo>
      <Search users={users || []} param={param} setParam={setParam}/>
      <ErrorBox error={error} />
      {/* {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null} */}
      <List  loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
  )
}

// Index.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`

const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
`
