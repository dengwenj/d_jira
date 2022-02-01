import React from 'react'
import { Button, Drawer } from 'antd'
import useProjectModal from 'hooks/useProjectModal'

export default function ProjectModal() {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer width={'100%'} visible={projectModalOpen} onClose={close}>
      <h1>我是抽屉</h1>

      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
