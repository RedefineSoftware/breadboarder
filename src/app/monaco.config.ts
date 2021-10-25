import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

declare const monaco: any;
export const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad() {
    monaco.languages.register({ id: 'bbml' });

    // inspired by: https://code.visualstudio.com/api/language-extensions/language-configuration-guide
    monaco.languages.setLanguageConfiguration('bbml', {
      comments: {
        lineComment: "//"
      },
      brackets: [
        ["{", "}"]
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "\"", close: "\""}
      ],
      surroundingPairs: [
        ["{", "}"],
        ["\"", "\""]
      ]
    })

    // Register a tokens provider for BBML
    // inspired by: https://microsoft.github.io/monaco-editor/monarch.html
    monaco.languages.setMonarchTokensProvider('bbml', {
      keywords: [
        'if', 'else', 'goto'
      ],

      typeKeywords: [
        'screen', 'component', 'button', 'field', 'label'
      ],

      operators: [
        '->'
      ],

      // we include these common regular expressions
      symbols: /[=><!~?:&|+\-*\/\^%]+/,

      // The main tokenizer for our languages
      tokenizer: {
        root: [
          // identifiers and keywords
          [/[a-z_$][\w$]*/, {
            cases: {
              '@typeKeywords': 'keyword',
              '@keywords': 'keyword',
              '@default': 'identifier'
            }
          }],
          [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely

          // whitespace
          { include: '@whitespace' },

          // delimiters and operators
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, {
            cases: {
              '@operators': 'operator',
              '@default': ''
            }
          }],

          // numbers
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/0[xX][0-9a-fA-F]+/, 'number.hex'],
          [/\d+/, 'number'],

          // strings
          [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

          // characters
          [/'[^\\']'/, 'string'],
          [/'/, 'string.invalid']
        ],

        comment: [
          [/[^\/*]+/, 'comment'],
          [/\/\*/, 'comment', '@push'],    // nested comment
          ["\\*/", 'comment', '@pop'],
          [/[\/*]/, 'comment']
        ],

        string: [
          [/[^\\"]+/, 'string'],
          [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],

        whitespace: [
          [/[ \t\r\n]+/, 'white'],
          [/\/\*/, 'comment', '@comment'],
          [/\/\/.*$/, 'comment'],
        ]
      },

    });
  },
};