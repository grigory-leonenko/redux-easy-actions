# [redux-easy-actions](https://github.com/grigory-leonenko/redux-easy-actions)

Redux/Flux action creation made simple

### Install

```
npm install redux-easy-actions
```

### Important

Starting version 0.4 library has been completely rewritten. Decorators using deprecated because of [this](https://phabricator.babeljs.io/T2645) and library no more support class as container for action creators methods, only plain objects.
All became even simpler :)

### The Problem

[Redux](http://rackt.github.io/redux) is a great library for JavaScript application building. But there is an inconvenience with the original solution: namely, "ACTION_TYPES" implemented as string constants.


```js
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
```

Ideally they are stored in a separate file. Thus, an import is required for action creators:

```js
import * as types from '../constants/ActionTypes';

export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}
```

...as well as for reducers:

```js
import { ADD_TODO, DELETE_TODO } from '../constants/ActionTypes';

export default function todos(state = {}, action) {
  switch (action.type) {
  case ADD_TODO:
    //some actions
  case DELETE_TODO:
    //some actions
  }
}
```

...and wait, didn't you forget about the components themselves? Import again!

```js
class TodoForm {
   submit(e){
       this.props.dispatch(this.props.addTodo(e.target.value));
   }
}
```

Seems like too much links, isn't it? And if you need to change a single action name, about 6 steps are required!

```
add or rename the string constant -> add or rename action creator -> rename or specify type in the payload -> add or rename the action inside components -> update the reducer's import -> update the reducer's switch statement code -> test it -> be happy
```

It looks very confusing. With [redux-easy-actions](https://github.com/grigory-leonenko/redux-easy-actions) this boilerplate will be much easier:

```
add or rename the action -> update the action inside component -> update switch condition -> test it -> be happy
```

### How it works

First write action creators, and import the EasyActions decorator:

```js

import EasyActions from 'redux-easy-actions';

const { Actions, Constansts } = EasyActions({
   ADD_TODO(type, text){
       return {type, text}
   },
   DELETE_TODO(type, id){
       return {type, id}
   }
})

export { Actions as Actions }
export { Constants as Constants }

```
> Important: As first argument always passed action type, this happens automatically no need to pass it manually. 

That's all! Actions are created. Next connect it to reducer:

```js
import { Constants } from '../actions/actions.js';

export default function todos(state = {}, action) {
  switch (action.type) {
      case Constants.ADD_TODO:
        //some actions
      case Constants.DELETE_TODO:
        //some actions
  }
}

```

To trigger the action from a component use:

```js
import {Actions} from '../actions/actions.js';

class TodoForm extends React.Component {
   submit(e){
       this.props.dispatch(Actions.ADD_TODO(e.target.value));
   }
}
```

Great! No strings, easy to change and integrate :)

### Is it production-ready?

Please keep in mind that it's still a very early version.

### Inspired by

* [Redux](http://rackt.github.io/redux)
* [Flux](https://facebook.github.io/flux/)
* [Autobind Decorator](https://github.com/andreypopp/autobind-decorator)
* My own hate of string constants.

### License

MIT
