import styled from "@emotion/styled"

interface IRow {
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}

export const Row = styled.div<IRow>` // div 是一个函数后面写的泛型 div<类型>()，相当于 div 是名字后面是要传的类型，不是写死的
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.marginBottom + 'rem'};
  justify-content: ${props => props.between ? 'space-between' : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
  }
`