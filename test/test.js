import EasyActions from '../src/core.js';
import assert from 'assert';

describe('redux-easy-actions full class decorator tests', () => {
    const ItemActions = EasyActions({
        ADD_ITEM(text){
            return {text}
        }
    })
    const {Actions, Constants} = ItemActions;

    it('constants and actions created', () => {
        assert(Actions && Constants);
    });

    it('right action type from action', () => {
        assert(Actions.ADD_ITEM().type === 'ADD_ITEM')
    })

    it('right payload from action', () => {
        assert(Actions.ADD_ITEM('Foo').text === 'Foo')
    })

    it('constant with action name exists', () => {
        assert(Constants.ADD_ITEM === 'ADD_ITEM')
    })
})
