/**
 * @fileoverview Prevents usage of _.isUndefined method
 * @author Watandeep Sekhon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prevents the use of lodash's isUndefined method",
            category: "Best Practices",
            recommended: false
        },
        fixable: 'code',
        schema: [],
    },

    create: function(context) {
        return {
          MemberExpression(node) {
            if (node.object.name === "_" && node.property.name === "isUndefined") {
              context.report({
                node,
                message: "Use native JavaScript to check for undefined",
                fix : function(fixer){
                  /**
                   * node is MemberExpression (_.isNull)
                   * node.parent is CallExpression (_.isNull())
                   */

                   //The scope to which auto fix will be applied. Most of the times, this will be the call expression
                   //unless it's preceded by UnaryExpression(s)
                   let scope = node.parent;

                  // If initial scope isn't a call expression something isn't right.
                  // Shouldn't happen but let's be defensive
                  // Also, if more than one argument was passed to isNull then don't attempt to autofix
                  if (scope.type !== 'CallExpression' || scope.arguments.length > 1) {
                    return;
                  }

                  // Grab the argument that was passed to the isNull function
                  const arg = scope.arguments[0];
                  let negate = false;

                  // Call expression's parent influences the way autofixing works.
                  // If it is a UnaryExpression with operator ! then our fix has to check for inequality
                  // Unless it is preceded by another ! operator
                  if (scope.parent.type === 'UnaryExpression' && scope.parent.operator === '!') {
                    scope = scope.parent;
                    negate = true;
                  }

                  if(scope.parent.type === 'UnaryExpression' && scope.parent.operator === '!') {
                      negate = false;
                      scope = scope.parent;
                  }

                  const fixToAppend = negate ? ' !== undefined' : ' === undefined';

                  // Get an instance of `SourceCode` so we can convert the argument to source code
                  // & append the fix to it
                  const sourceCode = context.getSourceCode();
                  let fixedCode = sourceCode.getText(arg) + fixToAppend;

                  // If the scope's parent is a BinaryExpression (eg ===) or LogicalExpression (eg &&)
                  // then wrap the fixedCode in brackets to avoid inadvertently changing the result
                  // Eg: We don't want to turn `testVar === _.isNull(5)` to `testVar === 5 === null`
                  // It should be turned into `testVar === (5 === null)`
                  if (scope.parent.type === 'BinaryExpression' || scope.parent.type === 'LogicalExpression') {
                    fixedCode = `(${fixedCode})`;
                  }

                  return fixer.replaceText(scope, fixedCode);
                }
              });
            }
          }
        };
    }
};
