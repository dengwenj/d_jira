import React, { useMemo } from 'react'
import { Table, TableProps, Button, Dropdown, Menu } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { IUser } from './search'
import Pin from 'components/pin'
import { useEditProject } from 'hooks/useEditProject'
import { ButtonNoPadding } from 'components/lab'

export interface IProject {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

// 继承的，TableProps<IProject> 里面的属性如果不是可选的那么 IList 必须要写，是可选的可以不写 
interface IList extends TableProps<IProject> {
  users: IUser[]
  refresh?(): void
  projectButton: JSX.Element
}

// 示例 以后如果碰到有对象要里面的其中一些属性可以这样
/* const { name, ...props } = {
  name: 's',
  age: 13,
  dd: 11,
  aaaaaa: 1111
}
console.log(props); // 是个对象 {age: 13, dd: 11, aaaaaa: 1111}

const [a, ...b] = [1, 2, 3, 4, 4]
console.log(b); // 是个数组 [2, 3, 4, 4] */

export default function List({ projectButton, users, ...props }: IList) { // props 是个对象和上面的示例一样
  const navigate = useNavigate() // 相当于原来的 useHistory
  const { mutate } = useEditProject()

  const pinProject = (id: number) => {
    return (pin: boolean) => {
      mutate({ id, pin  }).then(props.refresh)
    }
  }

  const columns = useMemo(() => {
    return [
      {
        title: <Pin checked disabled />,
        render(value: any, row: any) {
          return <Pin checked={row.pin} onCheckedChange={pinProject(row.id)} />
        }
      }, 
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        render(value: any, row: any, index: any) { // value 当前 字段的数据， row 当前行， index 索引
          // 这里也可以用 Link 标签 不用 Button 标签 Router-dom 里面的 Link to={}
          return <Button onClick={() => navigate(`/projects/${row.personId}`)} type='link'>{value}</Button>
        }
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
      },
      {
        title: '操作',
        render() {
          return (
            <Dropdown overlay={<Menu>
              <Menu.Item key={'edit'}>
                {projectButton}
              </Menu.Item>
            </Menu>}>
              <div style={{ cursor: 'pointer' }}>...</div>
            </Dropdown>
          )
        }
      }
    ]
  }, [users])

  return (
    <>
    {/* {...props} 下面这样写等同于, 比如 props={name: 'dwj', age: 18} => name='dwj' age=18 */}
     <Table pagination={false} columns={columns} {...props} />
    </>
  )
}
