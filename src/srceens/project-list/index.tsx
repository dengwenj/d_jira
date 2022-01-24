import React, { useState } from 'react'
import styled from '@emotion/styled'

import { useDebounce } from 'utils'
import List from './list'
import Search from './search'
import { useProjects } from 'hooks/useProject'
import { Typography } from 'antd'
import { useUser } from 'hooks/useUser'


export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

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

const Container = styled.div`
  padding: 3.2rem;
`
