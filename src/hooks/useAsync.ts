import { useState } from "react"
import { useMountedRef } from "./useMountedRef"

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitState: State<null> = {
  error: null,
  data: null,
  stat: 'idle'
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => {
  const config = {
    ...defaultConfig,
    ...initConfig
  }

  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initState
  })

  const mountedRef = useMountedRef()

  const  [retry, setRetry] = useState(() => () => {})

  const setData = (data: D | null) => setState({
    error: null,
    data,
    stat: 'success'
  })

  const setError = (error: Error) => setState({
    error,
    data: null,
    stat: 'error'
  })

  // run 用来触发异步请求
  const run = (promise: Promise<D>, runConfig?: { retry:  () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请输入 Promise 类型数据')
    }

    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })

    setState({ ...state, stat: 'loading' })

    return  promise.then(data => { // 这里的 data 就是 D 这个 泛型内容 
      if (mountedRef.current) {
        setData(data)
      }
      return data
    }).catch(error => {
      setError(error)
      
      if (config.throwOnError) return Promise.reject(error) 
      return state 
    })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry, 
    ...state
  }
}

