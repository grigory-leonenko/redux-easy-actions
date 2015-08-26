/**
 * Decorator for Redux actions. It eliminates the need for string constants and switches in reducers.
 *
 * @param {any} Method or Class with methods.
 *
 * @returns {function} Smart action or Class with smart actions.
 * */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (args.length === 1) {
        return wrapClass.apply(undefined, args);
    } else {
        return wrapMethod.apply(undefined, args);
    }
};

/**
 * Wrap all class methods into smart actions.
 *
 * @param {function} Require Class with methods as target.
 *
 * @returns {function} Class with smart actions.
 * */

function wrapClass(target) {
    var names = Object.getOwnPropertyNames(target.prototype);
    var methods = names.slice(1, names.length);
    methods.map(function (name) {
        target.prototype[name] = action(name, target.prototype[name]);
    });
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

function wrapMethod(target, key, descriptor) {
    return assign(descriptor, { value: action(key, descriptor.value) });
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

function action(name, fn) {
    var decorator = function decorator() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return fn.call.apply(fn, [this, name].concat(args));
    };
    Object.defineProperty(decorator, 'type', { value: name });
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

function assign(target, source) {
    for (var i in source) {
        target[i] = source[i];
    };
    return target;
}
module.exports = exports['default'];