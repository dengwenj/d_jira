import { useEffect } from "react"

const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldtitle = document.title

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldtitle
      }
    }
  })
}
export default useDocumentTitle