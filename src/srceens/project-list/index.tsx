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


export default function Index({ projectButton }: { projectButton: JSX.Element }) {
  /**
   * 基本类型可以放在依赖里，组件里的状态可以放在依赖里，非组件状态的对象类型不可以放在依赖里
   */
  useDocumentTitle('项目列表', false)
  
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
  const { data: users } = useUser()
 
  return (
    <Container>
      <HeaderInfo>
        <h1>项目列表</h1>
        {projectButton}
      </HeaderInfo>
      <Search users={users || []} param={param} setParam={setParam}/>
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List projectButton={projectButton} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}/>
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
