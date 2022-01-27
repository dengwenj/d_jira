import React from 'react'
import { Raw } from 'types'
import { Select } from 'antd'

// 这个 ComponentProps 就可以把 Select 的 props 类型拿到
type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string, id: number }[]
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(number(value)) 为 true 的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange 会回调 undefined
 * @returns 
 */
export default function IdSelect(props: IdSelectProps) {
  const { value, onChange, defaultOptionName, options, ...rest } = props
  
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...rest}
    >
      {
        defaultOptionName ? <Select.Option vlaue={0}>{defaultOptionName}</Select.Option> : null
      }
      {
        options?.map((option) => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
      }
    </Select>
  )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)
