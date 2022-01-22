import React, { useState, useEffect } from 'react'

import { useMount, useDebounce } from 'utils'
import { projects, user } from 'api/hh'

import List from './list'
import Search from './search'

export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debounce = useDebounce(param, 1000)

  useEffect(() => {
    projects(debounce).then((res) => {
      setList(res.data)
    })
  }, [debounce])

  useMount(async () => {
    const res = await user()
    setUsers(res.data)
  })

  return (
    <>
      <Search users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </>
  )
}
