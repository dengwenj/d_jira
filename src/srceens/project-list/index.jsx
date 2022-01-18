import React, { useState, useEffect } from 'react'
import qs from 'qs'

import { clearObject } from 'utils'

import List from './list'
import Search from './search'

const api = process.env.REACT_APP_API_URL

export default function Index() {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  console.log(param);
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${api}/projects?${qs.stringify(clearObject(param))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${api}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json()) 
      }
    })
  }, [])

  return (
    <>
      <Search users={users} param={param} setParam={setParam}/>
      <List users={users} list={list}/>
    </>
  )
}
