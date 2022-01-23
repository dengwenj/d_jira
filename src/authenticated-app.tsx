import React from 'react'
import styled from '@emotion/styled'

import Index from 'srceens/project-list'
import { useAuth } from 'hooks/useAuth'
import { Row } from 'components/lab'

// 登录的状态
export default function AuthenticatedApp() {
  const { loginOut } = useAuth()

  return (
    <>
      <Container>
        <Header between={true}>
          <HeaderLeft gap={true}>
            <h2>Logo</h2>
            <h2>项目</h2>
            <h2>用户</h2>
          </HeaderLeft>
          <HeaderRight>
            <button onClick={loginOut}>登出</button>
          </HeaderRight>
        </Header>
        <Main>
          <Index />
        </Main>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)``

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``