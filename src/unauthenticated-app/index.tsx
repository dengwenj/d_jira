import React, { useState } from 'react'
import { Divider, Card, Button } from 'antd'
import styled from '@emotion/styled'

import Login from './login';
import Register from './register'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'

// 非登录的状态
export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>
          {isRegister ? '请注册' : '请登录'}
        </Title>
        {isRegister ? <Register /> : <Login />} 
        <Divider />
        <Button type='link' onClick={() => setIsRegister(!isRegister)}>{isRegister ? '已经有账号了？直接登录' : '还没有账号？立即注册吧'}</Button>
      </ShadowCard>
    </Container>
  )
}

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 35rem;
  min-height: 29rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  border-radius: 0.6rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

export const LongButton = styled(Button)`
  width: 50%;
`