/**
 * Decorator for Redux actions. It eliminates the need for string constants and switches in reducers.
 *
 * @param {any} Method or Class with methods.
 *
 * @returns {function} Smart action or Class with smart actions.
 * */


export default function(ctx) {
    return function(...args){
        if (args.length === 1) {
            return wrapClass(...args);
        } else {
            return wrapMethod(...args, ctx);
        }
    }
}

/**
 * Wrap all class methods into smart actions.
 *
 * @param {function} Require Class with methods as target.
 *
 * @returns {function} Class with smart actions.
 * */


function wrapClass(target){
    const names = Object.getOwnPropertyNames(target.prototype);
    const methods = names.slice(1, names.length);
    methods.map(name => {
        target.prototype[name] = action(name, target.prototype[name]);
        target[name] = name;
})
return target;
}

/**
 * Wrap single methods into smart actions
 *
 * @param {function} Target class.
 *
 * @param {string} Method name.
 *
 * @param {object} Method descriptor.
 * */

function wrapMethod(target, key, descriptor, ctx){
    ctx[key] = key;
    return assign(descriptor, {value: action(key, descriptor.value)});
}


/**
 * Smart Action constructor, merge into function helper methods.
 *
 * @param {string} Method name.
 *
 * @param {function} Method.
 *
 * @returns {function} Smart action.
 * */

function action(name, fn){
    let decorator = function(...args){return fn.call(this, name, ...args)};
    Object.defineProperty(decorator, 'type', {value: name});
    return decorator;
}

/**
 * Assign helper.
 *
 * @param {object} Target object;
 *
 * @param {object} Source object;
 *
 * @return New object with merged properties;
 * */

function assign(target, source){
    for(let i in source){
        target[i] = source[i];
    };
    return target;
}
