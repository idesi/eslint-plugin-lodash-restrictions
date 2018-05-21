/**
 * @fileoverview Prevents usage of _.isUndefined method
 * @author Watandeep Sekhon
 */
"use strict";

const { autofix } = require('../helper.js');
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
            fix : autofix.bind(null, node, context, 'undefined'),
          });
        }
      }
    }
  }
};
