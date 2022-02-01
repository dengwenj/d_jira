import { useReducer } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[]
  present: T
  future: T[]
}

type Action<T> = { type: typeof UNDO | typeof REDO | typeof SET | typeof RESET, data: T }

// 这个参数就是 useReducer 的第二个参数
function undoReducer<T>(state: State<T>, action: Action<T>) {
  const { type, data } = action
  switch (type) {
    case UNDO:
      
      break;
   
    default:
      break;
  }

  return { ...state }
}

const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T> )
}

export default useUndo