import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface IState {
  projectModalOpen: boolean
}

const initialState: IState = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen