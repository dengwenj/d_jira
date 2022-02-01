import React from 'react'
import { Button, Drawer } from 'antd'

interface IProjectModalProps {
  projectmodalOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ projectmodalOpen, onClose }: IProjectModalProps) {
  return (
    <Drawer width={'100%'} visible={projectmodalOpen} onClose={onClose}>
      <h1>我是抽屉</h1>

      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  )
}
