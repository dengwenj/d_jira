import React from 'react'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Index from 'srceens/project-list'
import { useAuth } from 'hooks/useAuth'
import { Row } from 'components/lab'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import Project from 'srceens/project'

// 登录的状态
export default function AuthenticatedApp() {
  return (
    <>
      <Container>
        <PageHeader />
        <Main>
          <Router>
            <Routes>
              <Route path="/projects" element={<Index />} />
              <Route path="/projects/:projectId/*" element={<Project />} />
            </Routes>
          </Router>
        </Main>
      </Container>
    </>
  )
}

const PageHeader = () => {
  const { loginOut, user } = useAuth()

  const handleOverlay = () => {
    return (
      <Menu>
        <Menu.Item key={'loginout'}>
          <Button type='link'  onClick={loginOut}>登出</Button>
        </Menu.Item>
      </Menu>  
    )
  }

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={handleOverlay}>
          <Button type='link' onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``