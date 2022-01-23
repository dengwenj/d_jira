import React, { useState } from 'react'
import { Button, Card } from 'antd'

import Login from './login';
import Register from './register';

// 非登录的状态
export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {isRegister ? <Register /> : <Login />} 
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</Button>
        </div>
      </Card>
    </div>
  )
}
