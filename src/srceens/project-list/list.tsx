import React from 'react'

import { IUser } from './search'

interface IProject {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
}

interface IList {
  users: IUser[]
  list: IProject[]
}

export default function List({ users, list }: IList) {
  console.log(list);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map(project => {
              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{users.find(user => user.id === project.personId)?.name}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table> 
    </>
  )
}
