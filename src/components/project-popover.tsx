import React from 'react'
import { Popover, Typography, List, Divider } from 'antd'
import { useDispatch } from 'react-redux'

import { useProjects } from 'hooks/useProject'
import { ButtonNoPadding } from './lab'
import { projectListActions } from 'srceens/project-list/project-list-slice'

export default function ProjectPopover() {
  const dispatch = useDispatch()
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <div style={{ minWidth: '20rem' }}>
      <Typography.Text type='secondary'>收藏项目</Typography.Text>
      <List>
        {
          pinnedProjects?.map((project) => {
            return (
              <List.Item>
                <List.Item.Meta title={project.name} />
              </List.Item> 
            )
          })
        }
      </List>
      <Divider />
      <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())} type='link'>
        创建项目
      </ButtonNoPadding>
    </div>
  )
  
  return (
    <Popover placement='bottom' content={content}>
      <span>项目</span>
    </Popover>
  )
}
