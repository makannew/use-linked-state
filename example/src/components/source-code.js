import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import { prism as thisStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
SyntaxHighlighter.registerLanguage('jsx', jsx)

export default function SourceCode() {
  const highLightColor = '#ffff00'
  return (
    <div>
      <h4 className='code-title'>Parent component:</h4>

      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers='true'
        wrapLines={true}
        lineProps={(lineNumber) => {
          let style = { display: 'block' }
          if ([9, 13, 14].includes(lineNumber)) {
            style.backgroundColor = highLightColor
          }
          return { style }
        }}
      >
        {`
// Parent component
import React from 'react'
import { useStateGateway } from 'use-linked-state'
import FirstInput from './components/first-input'
import SecondInput from './components/second-input'

const App = () => {
  const gateway = useStateGateway('')
  return (
    <div>
      <h3>States of Input fields are linked together</h3>
      <FirstInput gateway={gateway} />
      <SecondInput gateway={gateway} />
    </div>
  )
}

export default App
      `}
      </SyntaxHighlighter>
      <h4 className='code-title'>First input field:</h4>

      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={(lineNumber) => {
          let style = { display: 'block' }
          if (lineNumber === 7) {
            style.backgroundColor = highLightColor
          }
          return { style }
        }}
      >
        {`
// First input field
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
      `}
      </SyntaxHighlighter>
      <h4 className='code-title'>Second input field:</h4>

      <SyntaxHighlighter
        className='code-style'
        language='jsx'
        style={thisStyle}
        showLineNumbers='true'
        wrapLines={true}
        lineProps={(lineNumber) => {
          let style = { display: 'block' }
          if (lineNumber === 7) {
            style.backgroundColor = highLightColor
          }
          return { style }
        }}
      >
        {`
// Second input field
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
        type='text'
        placeholder='Type here'
        value={state}
        onChange={handleChange}
      />
    </div>
  )
}

`}
      </SyntaxHighlighter>
    </div>
  )
}
