# [redux-easy-actions](https://github.com/grigory-leonenko/redux-easy-actions)

Decorator for easy creating actions and use with Redux or Flux.

### Install

```
npm install redux-easy-actions
```

### Problem or what for it...

[Redux](http://rackt.github.io/redux) is a great library for build JavaScript apps. But there is one problem, string constants as "Action Type".


```js
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
```

Ideally they are stored in a separate file. And need to be import into action creators.

```js
import * as types from '../constants/ActionTypes';

export function addTodo(text) {
  return { type: types.ADD_TODO, text };
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}
```

They must be imported to reducers.

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

Oh, and do not forget about the component.

```js
class TodoForm {
   submit(e){
       this.props.dispatch(this.props.addTodo(e.target.value));
   }
}
```

Too much links, is not it? Then you change one action name or add action, these steps should be taken:

```
add or name string constant -> add action creator or rename function name -> rename or specify type in payload -> rename or add action into component -> rename or add type in reducer import -> rename or add switch condition -> test it -> be happy
```

Looks very confusing. With [redux-easy-actions](https://github.com/grigory-leonenko/redux-easy-actions) this boilerplate will be much easier:

```
add or rename action -> rename or add action into component -> rename or add switch condition -> test it -> be happy
```

### How it works.

First need to write action creators, and import decorator:

```js

import EasyActions from 'redux-easy-actions';

@EasyActions
class Actions {
    ADD_TODO(type, text){
        return {
            type: type,
            text }
    }
    DELETE_TODO(type, id){
            return {
                type: type,
                id }
        }
}

export default new Actions();

```

That's all actions are created. Next connect it to reducer:

```js

import Actions from '../actions/actions.js';

export default function todos(state = {}, action) {
  switch (action.type) {
  case Actions.ADD_TODO.type():
    //some actions
  case Actions.DELETE_TODO.type():
    //some actions
  }
}

```

And call from component:

```js
class TodoForm {
   submit(e){
       this.props.dispatch(this.props.ADD_TODO(e.target.value));
   }
}
```

Great no strings, easy to change and integrate :)

### One additional feature

Redux have great utility to fast bind store dispatch with actions:

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

When actions creates as class method can be used such solution:

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
        this.dispatch({
            type: type,
            text
        })
    }
    DELETE_TODO(type, id){
        this.dispatch({
            type: type,
            id
        })
    }
}

export default Actions;
```

### Use in your app and what next?

I think Api will not change globaly, but of course it first version and changes will be.

### Inspirated

* [Redux](http://rackt.github.io/redux)
* [Flux](https://facebook.github.io/flux/)
* [Autobind Decorator](https://github.com/andreypopp/autobind-decorator)
* My own hate of string constants.

### License

MIT
