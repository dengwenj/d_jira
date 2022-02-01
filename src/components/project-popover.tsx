import React from 'react'
import { Popover, Typography, List, Divider } from 'antd'

import { useProjects } from 'hooks/useProject'
import { ButtonNoPadding } from './lab'

interface IProjectPopover {
  projectButton: JSX.Element
}

export default function ProjectPopover({ projectButton }: IProjectPopover) {
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
      {projectButton}
    </div>
  )
  
  return (
    <Popover placement='bottom' content={content}>
      <span>项目</span>
    </Popover>
  )
}
