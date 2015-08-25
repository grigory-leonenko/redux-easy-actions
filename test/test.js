import EasyActions from '../src/core.js';
import assert from 'assert';

describe('redux-easy-actions tests', () => {
    @EasyActions
    class Actions {
        ADD_ITEM(type, item){
            return {type, item}
        }
        DELETE_ITEM(type, id){
            return {type, id}
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

})