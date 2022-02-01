import React from 'react'
import { Popover, Typography, List } from 'antd'

import { useProjects } from 'hooks/useProject'

export default function ProjectPopover() {
  const { data: projects, isLoading } = useProjects()
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
    </div>
  )

  return (
    <Popover placement='bottom' content={content}>
      <span>项目</span>
    </Popover>
  )
}
