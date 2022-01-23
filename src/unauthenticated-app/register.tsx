import React from 'react'
import { Form, Input } from 'antd'

import { useAuth } from 'hooks/useAuth'
import { LongButton } from 'unauthenticated-app'

export interface ILoginParam {
  username: string
  password: string
}

export default function Login() {
  const { register } = useAuth()

  const handleSubmit = (values: ILoginParam ) => {
    register(values)
  }

  return (
    <Form
      labelCol={{ span: 6 }} // label 布局
      onFinish={handleSubmit}
    >
      <Form.Item label='用户名' name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder='请输入用户名' />
      </Form.Item>
      <Form.Item label='密码' name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder='请输入密码' />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType='submit' type='primary'>登录</LongButton>
      </Form.Item>
    </Form>
  )
}