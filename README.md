# [redux-easy-actions](https://github.com/grigory-leonenko/redux-easy-actions)

Redux/Flux action creation made simple

### Install

```
npm install redux-easy-actions
```

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

@EasyActions
class Actions {
    ADD_TODO(type, text){
        return {type, text}
    }
    DELETE_TODO(type, id){
        return {type, id}
    }
}

export default new Actions();

```

Or decorate specific methods you need:

```js
class Actions {
    @EasyActions
    ADD_TODO(type, text){
        return {type, text}
    }
    @EasyActions
    DELETE_TODO(type, id){
        return {type, id}
    }
    DELETE_ASYNC(id, dispatch){
        rest.del(`api/todos/${id}`)
            .then(() => dispatch(this.DELETE_TODO(id)))
    }
}
```

That's all! Actions are created. Next connect it to reducer:

```js

import Actions from '../actions/actions.js';

export default function todos(state = {}, action) {
  switch (action.type) {
      case Actions.ADD_TODO.type):
        //some actions
      case Actions.DELETE_TODO.type:
        //some actions
  }
}

```

To trigger the action from a component use:

```js
class TodoForm {
   submit(e){
       this.props.dispatch(this.props.ADD_TODO(e.target.value));
   }
}
```

Great! No strings, easy to change and integrate :)

### One additional feature

Redux has a great utility action dispatching and store binding inside the component:

```js
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions/todos';

class TodoApp extends Component {
  render() {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    return (
      <div>
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}
```

It becomes even simplier with redux-easy-actions:

```js
import Actions from '../actions/actions.js';

class TodoApp extends Component {
  render() {
    const { todos, dispatch } = this.props;
    const actions = new Actions(dispatch);

    return (
      <div>
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}
```

Actions:

```js
import EasyActions from 'redux-easy-actions';

@EasyActions
class Actions {
    constructor(dispatch){
        this.dispatch = dispatch;
    }
    ADD_TODO(type, text){
        this.dispatch({type, text})
    }
    DELETE_TODO(type, id){
        this.dispatch({type, id})
    }
}

export default Actions;
```

### Is it production-ready?

I don't think there will be any significant changes in API, but please keep in mind that it's still a very early version.

### Inspirated by

* [Redux](http://rackt.github.io/redux)
* [Flux](https://facebook.github.io/flux/)
* [Autobind Decorator](https://github.com/andreypopp/autobind-decorator)
* My own hate of string constants.

### License

MIT
