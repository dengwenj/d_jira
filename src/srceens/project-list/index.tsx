import React, { useState } from 'react'
import styled from '@emotion/styled'

import { useDebounce } from 'utils'
import List from './list'
import Search from './search'
import { useProjects } from 'hooks/useProject'
import { Typography } from 'antd'
import { useUser } from 'hooks/useUser'
import useDocumentTitle from 'hooks/useDocumentTitle'
import { useUrlQueryParam } from 'hooks/useUrlQueryParam'


export default function Index() {
  const [, setParam] = useState({
    name: '',
    personId: ''
  })

  const [key] = useState<('name' | 'personId')[]>(['name', 'personId']) // 防止重复渲染
  const [param] = useUrlQueryParam(key)

  useDocumentTitle('项目列表', false)

  const debounce = useDebounce(param, 200)
  const { isLoading, error, data: list } = useProjects(debounce)
  const { data: users } = useUser()
 
  return (
    <Container>
      <h1>项目列表</h1>
      <Search users={users || []} param={param} setParam={setParam}/>
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
  )
}

Index.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
