import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as escodegen from 'escodegen';

export function instrumentCode(jsCode: string): string {
  const ast = esprima.parseScript(jsCode, { loc: true });

  estraverse.traverse(ast, {
    enter(node, parent) {
      // Handle VariableDeclaration nodes
      if (node.type === 'VariableDeclaration') {
        const line = node.loc?.start.line || 0;

        // Inject a hook for each declared variable
        const hookStatements = node.declarations
          .map((declaration) => {
            if (declaration.id.type === 'Identifier') {
              return {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: { type: 'Identifier', name: '__hook' },
                  arguments: [
                    { type: 'Literal', value: line },
                    { type: 'Literal', value: declaration.id.name },
                    declaration.init || {
                      type: 'Identifier',
                      name: 'undefined',
                    },
                  ],
                },
              };
            }
            return null;
          })
          .filter(Boolean);

        // Insert the hooks after the variable declaration
        if (parent && parent.body && Array.isArray(parent.body)) {
          const index = parent.body.indexOf(node);
          parent.body.splice(index + 1, 0, ...hookStatements);
        }
      }

      // Handle ExpressionStatement nodes
      if (node.type === 'ExpressionStatement') {
        const line = node.loc?.start.line || 0;
        const hookNode = {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: '__hook' },
            arguments: [{ type: 'Literal', value: line }],
          },
        };

        if (parent && parent.body && Array.isArray(parent.body)) {
          const index = parent.body.indexOf(node);
          parent.body.splice(index, 0, hookNode);
        }
      }
    },
  });

  return escodegen.generate(ast);
}
