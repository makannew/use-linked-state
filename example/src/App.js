import React from 'react'

import { useStateGateway } from 'use-linked-state'
import FirstInput from './components/first-input'
import SecondInput from './components/second-input'
import Footer from './components/footer'
import SourceCode from './components/source-code'

const App = () => {
  const gateway = useStateGateway('')
  return (
    <div>
      <div className='top-panel'>
        <h3>States of Input fields are linked together</h3>
        <FirstInput gateway={gateway} />
        <SecondInput gateway={gateway} />
      </div>
      <div className='code-block'>
        <SourceCode />
        <Footer />
      </div>
    </div>
  )
}

export default App
