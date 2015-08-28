import EasyActions from '../src/core.js';
import assert from 'assert';

describe('redux-easy-actions full class decorator tests', () => {
    @EasyActions()
    class Actions {
        constructor(dispatcher){
            this.dispatcher = dispatcher;
        }
        ADD_ITEM(type, item){
            return {type, item}
        }
        DELETE_ITEM(type, id){
            return {type, id}
        }
        LINKED_ACTION(type, id){
            return this.DELETE_ITEM(id)
        }
        DISPATCH_ACTION(){
            return this.dispatcher;
        }
    }

    it('new actions instance creating', () => {
        let a = new Actions();
        assert(typeof a === 'object');
    });

    it('right action type from function method', () => {
        let a = new Actions();
        assert(Actions.ADD_ITEM === 'ADD_ITEM' && a.DELETE_ITEM.type === 'DELETE_ITEM')
    })

    it('right action type inside payload', () => {
        let a = new Actions();
        assert(a.ADD_ITEM().type === 'ADD_ITEM')
    })

    it('right payload from action', () => {
        let a = new Actions();
        assert(a.ADD_ITEM('FOO_ITEM').item === 'FOO_ITEM')
    })

    it('test context inside function', () => {
        let a = new Actions();
        assert(a.LINKED_ACTION(42).id === 42)
    })

    it('get dispatcher from constructor', () => {
        let a = new Actions('DISPATCHER');
        assert(a.DISPATCH_ACTION() === 'DISPATCHER')
    })

})


describe('redux-easy-actions single method decorator tests', () => {
    class Actions {
        constructor(dispatcher){
            this.dispatcher = dispatcher;
        }
        @EasyActions(Actions)
        ADD_ITEM(type, item){
            return {type, item}
        }
        @EasyActions(Actions)
        DELETE_ITEM(type, id){
            return {type, id}
        }
        @EasyActions(Actions)
        LINKED_ACTION(type, id){
            return this.DELETE_ITEM(id)
        }
        @EasyActions(Actions)
        DISPATCH_ACTION(){
            return this.dispatcher;
        }
    }

    it('new actions instance creating', () => {
        let a = new Actions();
        assert(typeof a === 'object');
    });

    it('right action type from function method', () => {
        let a = new Actions();
        console.log(Actions.ADD_ITEM)
        assert(Actions.ADD_ITEM === 'ADD_ITEM' && a.DELETE_ITEM.type === 'DELETE_ITEM')
    })

    it('right action type inside payload', () => {
        let a = new Actions();
        assert(a.ADD_ITEM().type === 'ADD_ITEM')
    })

    it('right payload from action', () => {
        let a = new Actions();
        assert(a.ADD_ITEM('FOO_ITEM').item === 'FOO_ITEM')
    })

    it('test context inside function', () => {
        let a = new Actions();
        assert(a.LINKED_ACTION(42).id === 42)
    })

    it('get dispatcher from constructor', () => {
        let a = new Actions('DISPATCHER');
        assert(a.DISPATCH_ACTION() === 'DISPATCHER')
    })

})