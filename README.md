# React hook for sharing data between components
Sharing data between components is possible through React context which is well described [by Sambhav Gore
](https://www.codementor.io/@sambhavgore/an-example-use-context-and-hooks-to-share-state-between-different-components-sgop6lnrd) 

However, sometimes we need a simpler solution for just specific components without having an higher level state and context. 
Mostly, it is desirable when we are building a component through composition of reusable components. For this purpose, we can use useLinkedState to connect two or more components through a common gateway.

# How to use
First import and instantiating a gateway in parent component.
```
import {useStateGateway} from "use-linked-state";
const myGateway = useStateGateway("this is initial state");
```
Then pass that `gateway` as a prop to every component that we want to connect.
```
return(
  <div>
    <Component1 stateGateway = {myGateway} />
    <Component2 />
    <Component3 stateGateway = {myGateway}/>
    <Component4 />
    <Component5 stateGateway = {myGateway}/>
  </div>
  )
```
Now in child components instead of useState we will import useLinkedState.
```
import { useLinkedState } from "use-linked-state";

export default function Component1({stateGateway}){

  const [state, setState] =  useLinkedState(stateGateway);

  ...In rest of component we can use state and setState as usual, 
  any setState will cause update of other subscribed components
  and state of this component may update by others as well.

}
```
Then each component will access to a shared state through its own `[state, setState]` and changing state by any of these components cause update of others. In this way we have more control on unwanted rendering due to change of higher component state. Also, it is useful to make more reusable components where they can talk together through a generic protocol.





