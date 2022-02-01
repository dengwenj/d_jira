import React from 'react'
import { Form, Input } from 'antd'
import { IProject } from './list'
import UserSelect from 'components/use-select'

export interface IUser {
  id: number ,
  name: string,
  email: string,
  title: string,
  organization: string
  token: string
}

interface ISearch {
  users: IUser[],
  param: Partial<Pick<IProject, 'name' | 'personId'>>
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
        <UserSelect
          value={param.personId}
          onChange={handleChangeParamSelect}
          defaultOptionName='负责人'
        />
        {/*   */}
      </Form.Item>
    </Form>
  )
}
