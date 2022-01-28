import { useMemo, useState } from "react"
import { useUrlQueryParam } from "hooks/useUrlQueryParam"

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [key] = useState<('name' | 'personId')[]>(['name', 'personId']) // 防止重复渲染
  const [param, setParam] = useUrlQueryParam(key)
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
} 