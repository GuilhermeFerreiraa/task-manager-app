import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/your-org/your-repo/blob/main/docs/rules/${name}.md`
);

export default {
  rules: {
    'use-box-instead-of-view': createRule({
      name: 'use-box-instead-of-view',
      meta: {
        type: 'problem',
        docs: {
          description: 'Use o componente Box ao invés do View, exceto no próprio componente Box',
          recommended: 'error',
        },
        messages: {
          useBoxInstead: 'Use o componente Box ao invés do View. O Box é um componente personalizado que oferece mais funcionalidades.',
        },
        fixable: 'code',
        schema: [],
      },
      defaultOptions: [],
      create(context) {
        return {
          ImportDeclaration(node) {
            if (node.source.value === 'react-native') {
              const viewImport = node.specifiers.find(
                specifier => specifier.imported.name === 'View'
              );
              
              if (viewImport) {
                // Verifica se o arquivo atual é o Box.tsx
                const isBoxComponent = context.getFilename().endsWith('Box.tsx');
                
                if (!isBoxComponent) {
                  context.report({
                    node: viewImport,
                    messageId: 'useBoxInstead',
                    fix(fixer) {
                      const newSpecifiers = node.specifiers
                        .filter(specifier => specifier.imported.name !== 'View')
                        .map(specifier => specifier.local.name);
                      
                      return [
                        fixer.replaceText(
                          node,
                          `import { ${newSpecifiers.join(', ')} } from 'react-native';`
                        ),
                        fixer.insertTextBefore(
                          node,
                          "import { Box } from 'components';\n"
                        ),
                      ];
                    },
                  });
                }
              }
            }
          },
          JSXElement(node) {
            if (node.openingElement.name.name === 'View') {
              // Verifica se o arquivo atual é o Box.tsx
              const isBoxComponent = context.getFilename().endsWith('Box.tsx');
              
              if (!isBoxComponent) {
                context.report({
                  node: node.openingElement,
                  messageId: 'useBoxInstead',
                  fix(fixer) {
                    const fixes = [];
                    fixes.push(fixer.replaceText(node.openingElement.name, 'Box'));
                    if (node.closingElement) {
                      fixes.push(fixer.replaceText(node.closingElement.name, 'Box'));
                    }
                    return fixes;
                  },
                });
              }
            }
          },
          JSXClosingElement(node) {
            if (node.name.name === 'View') {
              // Verifica se o arquivo atual é o Box.tsx
              const isBoxComponent = context.getFilename().endsWith('Box.tsx');
              
              if (!isBoxComponent) {
                context.report({
                  node,
                  messageId: 'useBoxInstead',
                  fix(fixer) {
                    return fixer.replaceText(node.name, 'Box');
                  },
                });
              }
            }
          },
        };
      },
    }),
  },
}; 