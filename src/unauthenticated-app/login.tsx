import React from 'react'
import { Form, Input } from 'antd'

import { useAuth } from 'hooks/useAuth'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'hooks/useAsync'

export interface ILoginParam {
  username: string
  password: string
}

export default function Login({ onError }: { onError: (error: Error) => void }) {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async (values: ILoginParam ) => {
    try {
      await run(login(values))
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
        <Input placeholder='请输入密码' type={'password'}/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType='submit' type='primary'>登录</LongButton>
      </Form.Item>
    </Form>
  )
}

