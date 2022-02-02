import React, { useEffect } from 'react'
import { Button, Drawer, Spin, Form, Input } from 'antd'
import styled from '@emotion/styled'

import useProjectModal from 'hooks/useProjectModal'
import UserSelect from 'components/use-select'
import { useAddProject, useEditProject } from 'hooks/useEditProject'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lab'

export default function ProjectModal() {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()

  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return ( 
    <Drawer forceRender={true} width={'100%'} visible={projectModalOpen} onClose={close}>
      {
        <Container>
          {
            isLoading ? <Spin size='large' /> : (
              <>
                <h1>{editingProject ? '编辑项目' : '创建项目'}</h1>
                <ErrorBox error={error}/>
                <Form form={form} layout='vertical' style={{ width: '40rem' }} onFinish={onFinish}>
                  <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入项目名' }]}>
                    <Input placeholder='请输入项目名称' />
                  </Form.Item>

                  <Form.Item label='部门' name='organization' rules={[{ required: true, message: '请输入部门名' }]}>
                    <Input placeholder='请输入部门名' />
                  </Form.Item>

                  <Form.Item label='负责人' name={'personId'}>
                    <UserSelect defaultOptionName={'负责人'} />
                  </Form.Item>

                  <Form.Item name={'personId'}>
                    <Button loading={mutateLoading} type='primary' htmlType='submit'>
                      提交
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )
          }
        </Container>
      }
    </Drawer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
`