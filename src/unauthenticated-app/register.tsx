import React from 'react'
import { Form, Input, message } from 'antd'

import { useAuth } from 'hooks/useAuth'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'hooks/useAsync'

export interface ILoginParam {
  username: string
  password: string
  cpassword: string
}

export default function Register({ onError }: { onError: (error: Error) => void }) {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({ cpassword, ...values }: ILoginParam ) => {
    if (cpassword !== values.password) {
      message.error('请确定两次输入的密码相同！')
      return
    }

    try {
      await run(register(values))
    } catch (e) {
      onError(e as Error)
    }
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
        <Input placeholder='请输入密码' type='password' />
      </Form.Item>
       <Form.Item label='确认密码' name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
        <Input placeholder='请确认密码' type='password' />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType='submit' type='primary'>登录</LongButton>
      </Form.Item>
    </Form>
  )
}