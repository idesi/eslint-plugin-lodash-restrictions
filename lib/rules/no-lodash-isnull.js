/**
 * @fileoverview Prevent usage of lodash's isNull method
 * @author Watandeep Sekhon
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Prevents the use of lodash's isNull method",
            category: "Best Practices",
            recommended: false
        },
        fixable: 'code',
        schema: [],
    },

    create: function(context) {
        return {
          MemberExpression(node) {
            if (node.object.name === "_" && node.property.name === "isNull") {
              context.report({
                node,
                message: "Use native JavaScript to check for null",
                fix : function(fixer){
                  /**
                   * node is MemberExpression (_.isNull)
                   * node.parent is CallExpression (_.isNull())
                   */

                  // If node.parent isn't a call expression something isn't right.
                  // Shouldn't happen but let's be defensive
                  // Also, if more than one argument was passed to isNull then don't attempt to autofix
                  if (node.parent.type !== 'CallExpression' || node.parent.arguments.length > 1) {
                    return;
                  }

                  // Grab the argument that was passed to the isNull function
                  const arg = node.parent.arguments[0];

                  // Get an instance of `SourceCode` so we can convert the argument to source code
                  // & append the fix to it
                  const sourceCode = context.getSourceCode();
                  let fixedCode = sourceCode.getText(arg) + ' === null';

                  // If node.parent.parent is a BinaryExpression (eg ===) or LogicalExpression (eg &&)
                  // then wrap the fixedCode in brackets to avoid inadvertently changing the result
                  // Eg: We don't want to turn `testVar === _.isNull(5)` to `testVar === 5 === null`  
                  if (node.parent.parent.type === 'BinaryExpression' || node.parent.parent.type === 'LogicalExpression') {
                    fixedCode = `(${fixedCode})`;
                  }

                  return fixer.replaceText(node.parent, fixedCode);
                }
              });
            }
          }
        };
    }
};
