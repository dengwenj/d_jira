import React from 'react'
import { Input, Button } from 'antd'

import { useSetUrlSearchParam } from 'hooks/useUrlQueryParam'
import { Row } from 'components/lab'
import { useTasksSearchParams } from './utils'
import UserSelect from 'components/use-select'
import TaskTypeSelect from 'components/task-type-select'

export default function SearchPanel() {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }
  
  return (
    <Row marginBottom={4} gap>
      <Input 
        style={{ width: '20rem' }} 
        placeholder='任务名' 
        value={searchParams.name} 
        onChange={e => setSearchParams({ name: e.target.value })} 
      />
      <UserSelect
        defaultOptionName='经办人' 
        value={searchParams.processorId} 
        onChange={value => setSearchParams({ processorId: value })} 
      />
      <TaskTypeSelect
        defaultOptionName='类型'
        value={searchParams.typeId}
        onChange={value => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
