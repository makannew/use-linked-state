import React from 'react'

import { useStateGateway } from 'use-linked-state'
import InputOne from './components/input-one'
import InputTwo from './components/input-two'

const App = () => {
  const gateway = useStateGateway('')
  return (
    <div>
      <h3>States of Input fields are linked together</h3>
      <InputOne gateway={gateway} />
      <InputTwo gateway={gateway} />
    </div>
  )
}

export default App
