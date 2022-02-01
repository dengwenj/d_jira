import { useUrlQueryParam } from "./useUrlQueryParam"

const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])

  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => setProjectModalOpen({ projectCreate: false })

  return {
    projectModalOpen: projectCreate === 'true',
    open,
    close
  }
}

export default useProjectModal