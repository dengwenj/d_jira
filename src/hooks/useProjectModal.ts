import { useProject } from "./useEditProject"
import { useUrlQueryParam } from "./useUrlQueryParam"

const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => {
    setProjectModalOpen({ projectCreate: undefined })
    setEditingProjectId({ editingProjectId: undefined })
    // setUrlParams
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
export default useProjectModal
