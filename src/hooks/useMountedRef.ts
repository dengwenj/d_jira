import { useEffect, useRef } from "react"

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回 false，反之
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}