import React, { useMemo } from 'react'
import { Table } from 'antd'
import dayjs from 'dayjs' 

import { IUser } from './search'

interface IProject {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface IList {
  users: IUser[]
  list: IProject[]
}

export default function List({ users, list }: IList) {
  const columns = useMemo(() => {
    return [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: '部门',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: '负责人', 
      key: 'personId',
      dataIndex: 'personId',
      render(value: number | string) {
        return <span>
          { users.find((item) => {
            return value === item.id
          })?.name }
        </span>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      render(vlaue: number) {
        return <span>
          {vlaue ? dayjs(vlaue).format('YYYY-MM-DD'): '无'}
        </span>
      }
    }
  ]
  }, [users])

  return (
    <>
     <Table pagination={false} dataSource={list} columns={columns} />
    </>
  )
}
