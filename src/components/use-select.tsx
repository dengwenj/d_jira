import React from 'react'

import { useUser } from 'hooks/useUser'
import IdSelect from './id-select'

export default function UserSelect(props: React.ComponentProps<typeof IdSelect>) {
  const { data: users } = useUser()

  return <IdSelect options={users || []} {...props} />
}
