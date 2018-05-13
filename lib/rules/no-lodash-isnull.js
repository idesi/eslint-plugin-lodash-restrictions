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
                  // If node.parent isn't a call expression something isn't right.
                  // Shouldn't happen but let's be defensive
                  if (node.parent.type !== 'CallExpression') {
                    return;
                  }

                  // If more than one argument was passed to isNull then don't attempt to autofix
                  if (node.parent.arguments.length > 1) {
                    return;
                  }

                  // Grab the argument that was passed to the isNull function
                  const arg = node.parent.arguments[0];

                  // Get an instance of SourceCode so we can convert the argument to source code
                  // & append the fix to it
                  const sourceCode = context.getSourceCode();
                  return fixer.replaceText(node.parent, sourceCode.getText(arg) + ' === null');
                }
              });
            }
          }
        };
    }
};
