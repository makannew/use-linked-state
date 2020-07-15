import { useEffect, useState, useRef } from 'react'

export function useStateGateway(initialState) {
  const gateway = useRef({ members: [], initialState })
  useEffect(() => {
    return () => {
      gateway.current = { members: [], initialState }
    }
  }, [])
  return gateway
}

export function useLinkedState(gateway) {
  const initialState = gateway.current?.hasOwnProperty('lastUpdate')
    ? gateway.current.lastUpdate
    : gateway.current?.initialState
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const thisMember = { state, setState }
    gateway.current.members.push(thisMember)
    return () => {
      gateway.current.members.splice(
        gateway.current.members.indexOf(thisMember),
        1
      )
    }
  }, [])

  useEffect(() => {
    if (
      gateway.current?.lastUpdate !== state ||
      !gateway.current.hasOwnProperty('lastUpdate')
    ) {
      for (let member of gateway.current.members) {
        if (member.setState !== setState) {
          member.setState(state)
        }
      }
      gateway.current.lastUpdate = state
    }
  }, [state])

  return [state, setState]
}
