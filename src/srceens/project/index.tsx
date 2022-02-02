import React from 'react'
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { Menu } from 'antd'

import KanBan from 'srceens/kanban'
import Epic from 'srceens/epic'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export default function Project() {
  const routeType = useRouteType()
  return (
    <Container>
      {/* 这里不写 /kanban 的话就是 当前这个路径再接着加上，写 / 的话 就是从跟路径开始 */}
      <Aside>
        <Menu mode='inline' selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>看板</Link> 
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/* /kanban , /epic 可以写也可以不写，例如 第一个写 第二个不写 一样可以 */}
          <Route path={'/kanban'} element={<KanBan />} /> 
          <Route path={'epic'} element={<Epic />} />
          {/* 重定向 */}
          <Route path='*' element={<Navigate to={window.location.pathname + '/kanban'} replace />}/> 
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.div`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px  -5px rgba(0, 0, 0, 0.1);
  /* width: 1350px; */
  display: flex;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;  
`
