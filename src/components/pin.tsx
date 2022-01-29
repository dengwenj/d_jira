import React from 'react'
import { Rate } from 'antd'

// 定义一个组件先定义他的 props
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?(checked: boolean): void
}

export default function Pin({ checked, onCheckedChange, ...rest }: PinProps) {
  return (
    <Rate
      count={1} 
      value={checked ? 1 : 0} 
      onChange={num => onCheckedChange?.(!!num)}
      {...rest}
    />
  )
}
