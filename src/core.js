/**
 * Library for creating string keys for actions creators without manually writing string constants
 *
 * @param {...Object} Single or multiple action creators objects as arguments.
 *
 * @returns {Object} Constants for mathing actions and Actions creaters.
 * */
export default function (...groups){
    return groups.reduce(combineGroups, []).reduce(formatActions, {Constants: {}, Actions: {}});
}

/**
 * Collect action creators from few groups to one list
 *
 * @param {Array} Collected action creators.
 *
 * @param {Object} Group with action creators.
 *
 * @returns {Array} Collected action creators.
 * */
function combineGroups(result, group){
    if(!isObject(group)){
        throw new Error(`Group of actions must be plain object!`)
    }
    return result.concat(parseObject(group))
}
/**
 * Prepare action creators to format.
 *
 * @param {Object} Group with action creators.
 *
 * @return {Array} List with parsed action creators.
 * */
function parseObject(group){
    return Object.keys(group).map(key => {return {name: key, fn: group[key]}})
}

/**
 * Split constants and action creators.
 *
 * @param {Object} Object with lists of constants and action creators.
 *
 * @return {Object} Object with lists of constants and action creators.
 * */
function formatActions({Constants, Actions}, action){
    if(Constants.hasOwnProperty(action.name)){
        throw new Error(`Action ${action.name} already exist!`)
    }
    return {
        Constants: Object.assign(Constants, {[action.name]: action.name}),
        Actions: Object.assign(Actions, {
            [action.name]: (...args) => Object.assign(
                { type: action.name },
                action.fn(...args)
            )
        })
    }
}

/**
 * Helper function to check is object is plain.
 *
 * @param {Object} Target to check.
 *
 * @returns {Boolean} Result of check.
 * */
function isObject(target){
    return Object.prototype.toString.call(target) === '[object Object]';
}
