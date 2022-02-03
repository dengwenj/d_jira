import React, { useState } from 'react';
import { Input } from 'antd';

import { useKanbansQueryKey, useProjectIdInUrl } from './utils';
import { useAddKanban } from 'utils/kanban';
import { ColumnsContainer } from '.';
import { Container } from './kanban-column';

export default function CreateKanban() {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())

  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }

  return (
    <Container>
      <ColumnsContainer>
        <Input
          size='large' 
          placeholder='新建看板名称' 
          onPressEnter={submit} 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
      </ColumnsContainer>
    </Container>
    
  )
}
