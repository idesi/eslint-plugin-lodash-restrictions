/**
 * @fileoverview Prevents usage of _.isUndefined method
 * @author Watandeep Sekhon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-lodash-isundefined"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

const errors = [{
    message : "Use native JavaScript to check for undefined",
    type: "MemberExpression"
}];

ruleTester.run("no-lodash-undefined", rule, {

    valid: [
      "valid = 5;",
      "test2 = function(opts) { return _.forEach([1, 2], function(v){ return v + 1}) }",
      "test = function() { if(test){ return; } }",
      "obj = { method1 : function(){} }",
      "test = function() { return test ? 1 : 2 }",
      "test = true ? 1 : 2",
    ],

    invalid: [
        {
            code: "test = _.isUndefined(5)",
            errors
        },
        {
            code: "test2 = function(opt) { return _.isUndefined(opt) }",
            errors
        },
        {
            code: "test2 = function() { if(_.isUndefined(opt)) { return false; } }",
            errors
        },
        {
            code: "obj = { method1 : function(){ _.isUndefined(5) ? 1 : 2 } }",
            errors
        },
        {
            code: "test2 = function(val) { return _.isUndefined(val) ? 1 : 2 }",
            errors
        },
        {
            code: "test = _.isUndefined(5) ? 1 : 2",
            errors
        }
    ]
});
