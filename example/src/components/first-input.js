import React from 'react'
import { useLinkedState } from 'use-linked-state'

export default function FirstInput({ gateway }) {
  const [state, setState] = useLinkedState(gateway)
  function handleChange(e) {
    setState(e.target.value)
  }
  return (
    <div>
      <input
        type='text'
        placeholder='Type here'
        value={state}
        onChange={handleChange}
      />
    </div>
  )
}
