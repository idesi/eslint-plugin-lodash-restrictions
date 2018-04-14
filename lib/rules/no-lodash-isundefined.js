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
        fixable: null,
        schema: [],
        messages: {
            'no-isUndefined' : "Use native JavaScript to check for undefined"
        },
    },

    create: function(context) {
        return {
          MemberExpression(node) {
            if (node.object.name === "_" && node.property.name === "isUndefined") {
              context.report({
                node,
                messageId: 'no-isUndefined'
              });
            }
          }
        };
    }
};
