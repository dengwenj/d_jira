import React from 'react'
import { Link, Routes, Route, Navigate } from 'react-router-dom'

import KanBan from 'srceens/kanban'
import Epic from 'srceens/epic'

export default function Project() {
  return (
    <>
      <h1>Project</h1>
      {/* 这里不写 /kanban 的话就是 当前这个路径再接着加上，写 / 的话 就是从跟路径开始 */}
      <Link to={'kanban'}>看板</Link> 
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanBan />} />
        <Route path={'/epic'} element={<Epic />} />
        {/* 重定向 */}
        <Route path='*' element={ <Navigate to={window.location.pathname + '/kanban'}/> }/> 
      </Routes>
      
    </>
  )
}
