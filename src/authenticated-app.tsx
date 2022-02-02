import React from 'react'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Index from 'srceens/project-list'
import { useAuth } from 'hooks/useAuth'
import { Row } from 'components/lab'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import Project from 'srceens/project'
import { resetRoute } from 'utils'
import ProjectModal from 'srceens/project-list/project-modal'
import ProjectPopover from 'components/project-popover'
import useProjectModal from 'hooks/useProjectModal'

// 登录的状态
export default function AuthenticatedApp() {

  return (
    <>
      <Container>
        <Router>
          <PageHeader />
          <Main>
            <Routes>
              <Route path="/projects" element={<Index />} />
              <Route path="/projects/:projectId/*" element={<Project />} />
              <Route path="*" element={<Navigate to={'/projects'}/>}/>
            </Routes>
          </Main>
          <ProjectModal />
        </Router>
      </Container>
    </>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ paddingBottom: 55 }} type='link' onClick={() => resetRoute() }>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
        </Button>
        <ProjectPopover/>
        <span>用户</span>
      </HeaderLeft> 
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
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
    <Dropdown overlay={handleOverlay}>
      <Button type='link' onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
    </Dropdown>
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

const Main = styled.main`
  display: flex;
  overflow: hidden;
`