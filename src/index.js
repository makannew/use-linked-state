import { useEffect, useState, useRef } from 'react'

export function useStateGateway(initialState) {
  const gateway = useRef({ members: [], initialState })
  useEffect(() => {
    return () => {
      gateway.current = { members: [], initialState }
    }
  }, [])
  return gateway.current
}

export function useLinkedState(gateway) {
  const [state, setState] = useState(gateway?.initialState)
  const notFirstRun = useRef()

  useEffect(() => {
    const thisMember = { state, setState }
    gateway.members.push(thisMember)
    return () => {
      gateway.members.splice(gateway.members.indexOf(thisMember), 1)
    }
  }, [])

  useEffect(() => {
    if (gateway?.lastUpdate !== state) {
      for (let member of gateway.members) {
        if (member.setState !== setState && notFirstRun.current) {
          member.setState(state)
        }
      }
    }
    gateway.lastUpdate = state
    if (!notFirstRun.current) {
      if (
        gateway.members.length > 0 &&
        gateway.members[0].setState !== setState
      ) {
        setState(gateway.members[0].state)
      }
      notFirstRun.current = true
    }
  }, [state])

  return [state, setState]
}
