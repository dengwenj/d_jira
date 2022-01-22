import React, { useState } from 'react';

import Login from 'srceens/login'
import Register from './register';

// 非登录的状态
export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <>
      {/* 展示登录页面或者注册页面 */}
      {isRegister ? <Register /> : <Login />} 
      <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</button>
    </>
  )
}
