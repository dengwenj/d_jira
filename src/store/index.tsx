import { configureStore } from "@reduxjs/toolkit"

import { projectListSlice } from "srceens/project-list/project-list-slice"

export const rootReducer = {
  projectList: projectListSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
// ReturnType 会帮读出来函数的返回值
export type RootState = ReturnType<typeof store.getState>