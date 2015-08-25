import EasyActions from '../src/core.js';
import assert from 'assert';

describe('redux-easy-actions full class decorator tests', () => {
    @EasyActions
    class Actions {
        ADD_ITEM(item){
            return {type: this.type(), item}
        }
        DELETE_ITEM(id){
            return {type: this.type(), id}
        }
        LINKED_ACTION(id){
            return this.parent.DELETE_ITEM(id)
        }
    }

    it('new actions instance creating', () => {
        let a = new Actions();
        assert(typeof a === 'object');
    });

    it('right action type from function method', () => {
        let a = new Actions();
        assert(a.ADD_ITEM.type() === 'ADD_ITEM')
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

})


describe('redux-easy-actions single method decorator tests', () => {
    class Actions {
        @EasyActions
        ADD_ITEM(item){
            return {type: this.type(), item}
        }
        @EasyActions
        DELETE_ITEM(id){
            return {type: this.type(), id}
        }
        @EasyActions
        LINKED_ACTION(id){
            return this.parent.DELETE_ITEM(id)
        }
    }

    it('new actions instance creating', () => {
        let a = new Actions();
        assert(typeof a === 'object');
    });

    it('right action type from function method', () => {
        let a = new Actions();
        assert(a.ADD_ITEM.type() === 'ADD_ITEM')
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

})