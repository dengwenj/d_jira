import React, { useState, useEffect } from 'react'

import { useMount, useDebounce } from 'utils'
import { projects, user } from 'api/hh'
import { useHttp } from 'utils/http'
import List from './list'
import Search from './search'

export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const cline = useHttp()

  const debounce = useDebounce(param, 1000)

  useEffect(() => {
    // projects(debounce).then((res) => {
    //   setList(res.data)
    // })
    cline('projects', { data: debounce }).then((res) => {
      setList(res)
    })
  }, [debounce])

  useMount(() => {
    // const res = await user()
    // setUsers(res.data)
    cline('users').then((res) => {
      setUsers(res)
    })
  })

  return (
    <>
      <Search users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </>
  )
}
