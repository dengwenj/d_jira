import React from 'react'
import { Form, Input, Select } from 'antd'

export interface IUser {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string
  token: string
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

  const handleChangeParamSelect = (value: any) => {
    setParam({
      ...param,
      personId: value
    })
  }

  return (
    <Form style={{ marginBottom: '2rem' }} layout='inline'>
      <Form.Item>
        <Input 
          placeholder='项目名'
          type="text"
          value={param.name}
          onChange={handleChangeParamInput}
        />
      </Form.Item>
  
      <Form.Item>
        <Select style={{ width: 100 }} defaultValue="负责人" onChange={handleChangeParamSelect}>
          {users.map(item => (
            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
