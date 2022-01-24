import React, { useState } from 'react'
import styled from '@emotion/styled'

import { useMount, useDebounce } from 'utils'
// import { projects, user } from 'api/hh'
import { useHttp } from 'utils/http'
import List from './list'
import Search from './search'
import { useProjects } from 'hooks/useProject'
import { Typography } from 'antd'


export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  // const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  const cline = useHttp()
  const debounce = useDebounce(param, 1000)
  const { isLoading, error, data: list } = useProjects(debounce)

  // useEffect(() => {
  //   setIsLoading(true)
  //   cline('projects', { data: clearObject(debounce) }).then((res) => {
  //     setList(res)
  //   }).finally(() => {
  //     setIsLoading(false)
  //   })
  //   // eslint-disable-next-line
  // }, [debounce])

  useMount(() => {
    cline('users').then((res) => {
      setUsers(res)
    })
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <Search users={users} param={param} setParam={setParam}/>
      {error ? <Typography.Text type='danger'>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users} dataSource={list || []}/>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
