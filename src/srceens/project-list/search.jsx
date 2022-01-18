import React from 'react'

export default function Search({ users, param, setParam }) {
  const  handleChangeParamInput = e => {
    setParam({
      ...param,
      name: e.target.value
    })
  }

  const handleChangeParamSelect = e => {
    setParam({
      ...param,
      personId: e.target.value
    })
  }

  return (
    <>
      <form>
        <input type="text" value={param.name} onChange={handleChangeParamInput}/>
        <select value={param.personId} onChange={handleChangeParamSelect}>
          <option value="">负责人</option>
          {users.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </form>
    </>
  )
}
