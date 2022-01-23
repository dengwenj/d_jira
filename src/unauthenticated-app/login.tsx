import React from 'react'
import { Form, Input, Button } from 'antd'

import { useAuth } from 'hooks/useAuth'

export interface ILoginParam {
  username: string
  password: string
}

export default function Login() {
  const { login, user } = useAuth()

  const handleSubmit = (values: ILoginParam ) => {
    login(values)
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
        <Input placeholder='请输入密码' type={'password'}/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType='submit' type='primary'>登录</Button>
      </Form.Item>
    </Form>
  )
}

