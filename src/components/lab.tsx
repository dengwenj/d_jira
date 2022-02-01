import styled from "@emotion/styled"
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'my-jira-dev-tool'
 
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

export const SpinLoading = () => {
  return <FullPage>
    <Spin size='large' />
  </FullPage>
}
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

export const FullPageError = ({ error }: { error: Error | null}) => {
  return <FullPage>
    <DevTools />
    <Typography.Text type='danger'>{error?.message}</Typography.Text>
  </FullPage>
}

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`