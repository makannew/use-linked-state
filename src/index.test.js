import { useStateGateway } from '.'
import { useLinkedState } from '.'
import { renderHook, act } from '@testing-library/react-hooks'
import { render, fireEvent, screen } from '@testing-library/react'
import React, { useRef } from 'react'

describe('use-linked-state hooks', () => {
  //
  it('undefined initial state', () => {
    //
    const { result: resultG } = renderHook(() => useStateGateway())
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const [state1, setState1] = resultL1.current
    // return values
    expect(state1).toBe(undefined)
    expect(typeof setState1).toBe('function')
  })
  //
  it('null initial state', () => {
    //
    const { result: resultG } = renderHook(() => useStateGateway(null))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const [state1, setState1] = resultL1.current
    // return values
    expect(state1).toBe(null)
    expect(typeof setState1).toBe('function')
  })
  //
  //
  it('functional initial state', () => {
    const initialState = { value: 1 }
    //
    const { result: resultG } = renderHook(() =>
      useStateGateway(() => initialState)
    )
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const [state1, setState1] = resultL1.current
    // return values
    expect(state1).toBe(initialState)
    expect(typeof setState1).toBe('function')
  })
  //
  it('set initial state', () => {
    const initialState = { value: 'initial value' }
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const [state1, setState1] = resultL1.current
    // return values
    expect(state1).toBe(initialState)
    expect(typeof setState1).toBe('function')
  })
  //
  it('immutable state', () => {
    const initialState = { value: 1 }
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    // setState1 then expect self and state2 not same object
    const newValue = { value: 1 }
    act(() => {
      resultL1.current[1](newValue)
    })
    expect(resultL1.current[0]).toBe(newValue)
    expect(resultL1.current[0]).toEqual(initialState)
    expect(resultL2.current[0]).toBe(newValue)
    expect(resultL2.current[0]).toEqual(initialState)
  })
  //
  it('share state between two members', () => {
    const initialState = { value: 1 }
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    // setState1 then expect self and state2
    act(() => {
      resultL1.current[1]((state) => ({ ...state, value: state.value + 1 }))
    })
    expect(resultL1.current[0].value).toBe(2)
    expect(resultL2.current[0].value).toBe(2)
    // setState2 then expect state1
    act(() => {
      resultL2.current[1]((state) => ({ ...state, value: state.value + 1 }))
    })

    expect(resultL1.current[0].value).toBe(3)
  })
  //
  it('share primitive state between three members', () => {
    const initialState = 1
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL3 } = renderHook(() =>
      useLinkedState(resultG.current)
    )

    // setState3 then expect state1 and state2
    act(() => {
      resultL3.current[1]((state) => state + 1)
    })
    expect(resultL1.current[0]).toBe(2)
    expect(resultL2.current[0]).toBe(2)
    // setstate2 expect state1 and state3
    const newState = { value: 'hello' }
    act(() => {
      resultL2.current[1](newState)
    })
    expect(resultL1.current[0]).toBe(newState)
    expect(resultL3.current[0]).toBe(newState)
  })
  //
  it('unmount a member', () => {
    const initialState = 1
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1, unmount: unmountL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2, unmount: unmountL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL3 } = renderHook(() =>
      useLinkedState(resultG.current)
    )

    // setState1
    act(() => {
      resultL1.current[1]((state) => state + 1)
    })
    //
    unmountL1()
    //
    expect(resultL2.current[0]).toBe(2)
    expect(resultL3.current[0]).toBe(2)
    // setState2 expect state3
    act(() => {
      resultL2.current[1]((state) => state + 1)
    })
    expect(resultL3.current[0]).toBe(3)
    //
    unmountL2()
    // setState3 expect state3
    act(() => {
      resultL3.current[1]((state) => state + 1)
    })
    expect(resultL3.current[0]).toBe(4)
  })
  //
  it('mount after first setState', () => {
    const initialState = 1
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    // setState1
    act(() => {
      resultL1.current[1]((state) => state + 1)
    })
    //
    const { result: resultL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )

    //
    expect(resultL2.current[0]).toBe(2)
  })
  //
  it('unmount and mount again', () => {
    const initialState = 1
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1, unmount: unmountL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2, unmount: unmountL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL3, unmount: unmountL3 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    unmountL2()
    // setState1
    act(() => {
      resultL1.current[1]((state) => state + 1)
    })
    //
    const { result: newResultL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    unmountL1()
    unmountL3()
    //
    expect(newResultL2.current[0]).toBe(2)
  })
  //
  it('keep state after all unmount', () => {
    const initialState = 1
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1, unmount: unmountL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2, unmount: unmountL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    // setState1
    act(() => {
      resultL1.current[1]((state) => state + 1)
    })
    //
    unmountL1()
    unmountL2()
    //
    const { result: resultL3 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    expect(resultL3.current[0]).toBe(2)
  })
  //
  it('consecutive setState', () => {
    const initialState = 1
    //
    const { result: resultG } = renderHook(() => useStateGateway(initialState))
    //
    const { result: resultL1 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    const { result: resultL2 } = renderHook(() =>
      useLinkedState(resultG.current)
    )
    //
    // consecutive setState1
    act(() => {
      resultL1.current[1]((state) => state + 1)
      resultL1.current[1]((state) => state + 1)
      resultL1.current[1]((state) => state + 1)
      resultL1.current[1]((state) => state + 1)
    })
    //
    expect(resultL1.current[0]).toBe(5)
    expect(resultL2.current[0]).toBe(5)
  })
})
//
describe('use-linked-state inside parent component', () => {
  //
  const Component1 = ({ stateGateway }) => {
    const [state1, setState1] = useLinkedState(stateGateway)
    function handleClick(e) {
      setState1((state1) => state1 + 1)
    }
    return (
      <div data-testid='comp1' onClick={handleClick}>
        {state1}
      </div>
    )
  }
  //
  const Component2 = ({ stateGateway, testData }) => {
    const [state2, setState2] = useLinkedState(stateGateway)
    const renderNum = useRef(0)
    function handleClick(e) {
      setState2((state2) => state2 + 1)
    }
    ++renderNum.current
    return (
      <div>
        <div data-testid='comp2' onClick={handleClick}>
          {state2}
        </div>
        <div data-testid='render2' onClick={handleClick}>
          {renderNum.current}
        </div>
      </div>
    )
  }
  //
  function ParentComponent() {
    const gateway = useStateGateway(1)

    return (
      <div>
        <Component1 stateGateway={gateway} />
        <Component2 stateGateway={gateway} />
      </div>
    )
  }
  //
  it('number of rendering per setState', () => {
    render(<ParentComponent />)
    //
    fireEvent.click(screen.getByTestId('comp1'))
    expect(screen.getByTestId('render2').innerHTML).toBe('2')
    //
    fireEvent.click(screen.getByTestId('comp1'))
    fireEvent.click(screen.getByTestId('comp2'))

    expect(screen.getByTestId('render2').innerHTML).toBe('4')
  })
  //
  it('alternate consecutive setState', () => {
    render(<ParentComponent />)
    //
    fireEvent.click(screen.getByTestId('comp2'))
    fireEvent.click(screen.getByTestId('comp2'))
    expect(screen.getByTestId('comp1').innerHTML).toBe('3')
    expect(screen.getByTestId('comp2').innerHTML).toBe('3')
    //
    fireEvent.click(screen.getByTestId('comp1'))
    fireEvent.click(screen.getByTestId('comp1'))
    fireEvent.click(screen.getByTestId('comp2'))
    fireEvent.click(screen.getByTestId('comp2'))
    fireEvent.click(screen.getByTestId('comp1'))
    expect(screen.getByTestId('comp1').innerHTML).toBe('8')
    expect(screen.getByTestId('comp2').innerHTML).toBe('8')
  })
})
