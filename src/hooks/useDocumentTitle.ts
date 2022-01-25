import { useEffect, useRef } from "react"

const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef 在整个生命周期中是不变的
  const oldtitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧 title, 也可以用 useRef
        document.title = oldtitle
      }
    }
  },[keepOnUnmount, oldtitle])
}
export default useDocumentTitle