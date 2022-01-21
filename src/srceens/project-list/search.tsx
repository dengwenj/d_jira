import React from 'react'

export interface IUser {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string
}

interface ISearch {
  users: IUser[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: ISearch['param']) => void
}

export default function Search({ users, param, setParam }: ISearch) {
  const  handleChangeParamInput = (e: any) => {
    setParam({
      ...param,
      name: e.target.value
    })
  }

  const handleChangeParamSelect = (e: any) => {
    setParam({
      ...param,
      personId: e.target.value
    })
  }

  return (
    <>
      <form>
        <input type="text" value={param.name} onChange={handleChangeParamInput}/>
        <select onChange={handleChangeParamSelect}>
          <option value="">负责人</option>
          {users.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </form>
    </>
  )
}
