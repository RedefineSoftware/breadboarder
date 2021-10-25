import { Component } from '@angular/core';

// @ts-ignore
import bbml from './bbml.js';
import { BbmlSyntaxTree } from './shared/ast.model.js';

@Component({
  selector: 'bb-root',
  template: `
    <div class="container">
      <div class="code-pane">
        <ngx-monaco-editor style="height: 100%" [options]="editorOptions" [(ngModel)]="code" (ngModelChange)="parse(code)"></ngx-monaco-editor>
      </div>

      <bb-runner class="run-pane" [ast]="ast"></bb-runner>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      height: 100vh;
      width: 100vw;
    }

    .code-pane {
      flex: 1;
      background: #1e1e1e;
    }

    .run-pane {
      flex: 2;
      overflow: auto;
    }
  `]
})
export class AppComponent {
  editorOptions = {
    theme: 'vs-dark',
    language: 'bbml',
    minimap: {
      enabled: false
    },
    autoClosingBrackets: 'languageDefined',
    tabSize: 2
  };

  code = `screen Login {
  field "Username: "
  field "Password: "
  button "Log In" -> Main
}

screen Main {
  button "Go to Profile" -> Profile
  button "Log Out" -> Login
}`

  ast: BbmlSyntaxTree = [];

  ngOnInit() {
    this.parse(this.code);
  }

  parse(code: string) {
    try {
      this.ast = bbml.parse(code) as BbmlSyntaxTree;
    } catch (e) {
      // console.log(e);
    }
  }
}
