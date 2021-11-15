import {useState} from "react"
import constate from "constate"

function useGlobal() {
  const [state, setState] = useState(0)

  return {state, setState}
}

const [GlobalProvider, useGlobalContext] = constate(useGlobal)

export {GlobalProvider, useGlobalContext}
