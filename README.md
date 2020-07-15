# use-linked-state

> React hook for sharing data across functional components

[![NPM](https://img.shields.io/npm/v/use-linked-state.svg)](https://www.npmjs.com/package/use-linked-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<br/>
<br/>
  Two or more child components share their state without affecting parrent component
<br/>
<br/>



## Install

```console
npm install --save use-linked-state
```
<br/>
<br/>
# How to use

[Demo and Code](https://makannew.github.io/use-linked-state/)

In parrent component declare a gateway
```jsx
import { useStateGateway } from 'use-linked-state'
const myGateway = useStateGateway('this is initial state')
```

```jsx
return (
  <div>
    <Component1 stateGateway={myGateway} />
    <Component2 />
    <Component3 stateGateway={myGateway} />
    <Component4 />
    <Component5 stateGateway={myGateway} />
  </div>
)
```

In child components instead of `useState` use `useLinkedState`.

```jsx
import { useLinkedState } from "use-linked-state";

export default function Component1({stateGateway}){

  const [state, setState] =  useLinkedState(stateGateway);

  ...In rest of component we can use state and setState as usual,
  any setState will cause update of other subscribed components
  and state of this component may updated by others as well.

}
```

Then each component will access to a shared state through its own `[state, setState]` and changing state by any of these components cause update of others. In this way we have more control on unwanted rendering due to change of higher component state. Also, it is useful to make more reusable components where they can talk to each other through a private line which can handle huge amount of communication whithout affecting other parts.

## motivation
Sharing data between components is possible through React context which is well described [ here by Sambhav Gore
](https://www.codementor.io/@sambhavgore/an-example-use-context-and-hooks-to-share-state-between-different-components-sgop6lnrd)

However, sometimes we need a simpler solution for just specific components without having an higher level state and context.
Mostly, it is desirable when we are building a component through composition of reusable components. For this purpose, we can use `useLinkedState` to connect two or more components through a common gateway.

## License

MIT © [makannew](https://github.com/makannew)
