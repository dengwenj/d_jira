import React from 'react'
import styled from '@emotion/styled'
import { Card } from 'antd'
import { CheckOutlined, StopOutlined } from '@ant-design/icons'

import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTasksSearchParams } from './utils'
import { useTaskTypes } from 'utils/task-type'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name

  if (!name) {
    return null
  }
  return (
    <>
      {
        name === 'task' ? <CheckOutlined style={{ backgroundColor: 'skyblue', color: 'white' }} /> : <StopOutlined style={{ backgroundColor: '#e35158', color: 'white' }} />
      }
    </>
  )
}

export default function KanbanColumn({ kanban }: { kanban: Kanban }) {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Container>
      <TasksContaniner>
        <h3>{kanban.name}</h3>
        {
          tasks?.map((task) => <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
            <div>
              {task.name}
            </div>
            <TaskTypeIcon id={task.typeId} />
          </Card>)
        }
      </TasksContaniner>
    </Container>
  )
}

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem ;
`

const TasksContaniner = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
