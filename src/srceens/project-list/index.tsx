import React, { useState, useEffect } from 'react'
import qs from 'qs'
import axios from 'axios'

import { clearObject, useMount, useDebounce } from 'utils'

import List from './list'
import Search from './search'

const api = process.env.REACT_APP_API_URL

export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debounce = useDebounce(param, 1000)

  useEffect(() => {
    axios.get(`${api}/projects?${qs.stringify(clearObject(debounce))}`).then(res => {
      setList(res.data)
    })
  }, [debounce])

  useMount(() => {
    axios.get(`${api}/users`).then(res => {
      setUsers(res.data)
    })
  })

  return (
    <>
      <Search users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </>
  )
}
