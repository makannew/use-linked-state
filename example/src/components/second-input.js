import React from 'react'
import { useLinkedState } from 'use-linked-state'

export default function SecondInput({ gateway }) {
  const [state, setState] = useLinkedState(gateway)
  function handleChange(e) {
    setState(e.target.value)
  }
  return (
    <div>
      <input
        id='second-input'
        type='text'
        placeholder='Type here'
        value={state}
        onChange={handleChange}
      />
    </div>
  )
}
