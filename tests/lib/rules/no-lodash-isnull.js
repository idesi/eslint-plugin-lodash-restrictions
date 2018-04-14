/**
 * @fileoverview Prevent usage of lodash&#39;s isNull method
 * @author Watandeep Sekhon
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-lodash-isnull"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const errors = [{
    message : "Use native JavaScript to check for null",
    type: "MemberExpression"
}];

var ruleTester = new RuleTester();
ruleTester.run("no-lodash-isnull", rule, {

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
          code: "test = _.isNull(5)",
          errors
      },
      {
          code: "test2 = function(opt) { return _.isNull(opt) }",
          errors
      },
      {
          code: "test2 = function() { if(_.isNull(opt)) { return false; } }",
          errors
      },
      {
          code: "obj = { method1 : function(){ _.isNull(5) ? 1 : 2 } }",
          errors
      },
      {
          code: "test2 = function(val) { return _.isNull(val) ? 1 : 2 }",
          errors
      },
      {
          code: "test = _.isNull(5) ? 1 : 2",
          errors
      }
    ]
});
