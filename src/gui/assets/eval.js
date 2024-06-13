function param(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };
function xhr(url) {
  var req = null;
  return new Promise(function (c, e) {
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req._canceled) {
        return;
      }

      if (req.readyState === 4) {
        if (
          (req.status >= 200 && req.status < 300) ||
          req.status === 1223
        ) {
          c(req);
        } else {
          e(req);
        }
        req.onreadystatechange = function () { };
      }
    };

    req.open("GET", url, true);
    req.responseType = "";

    req.send(null);
  }).catch(function () {
    req._canceled = true;
    req.abort();
  });
}
let proxy = URL.createObjectURL(new Blob([`
      self.MonacoEnvironment = {
          baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
      };
      importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
  `], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], async function () {
  let keywords = await fetch("https://api.aoijs.org/api/getArrayFunctionList")
    .then(data => data.json())
    .then((json) => { return json.data })
  console.log(keywords)
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        ...keywords.map(k => {
          /*let d = await fetch("https://api.aoijs.org/api/panelfunction?function="+k)
    .then(data=>data.json())
    .then((json) => {return json})*/


          return {
            label: k,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: k,
          };
        })
      ];
      console.log(suggestions)
      return { suggestions: suggestions };
    }
  });



  monaco.languages.registerHoverProvider("javascript", {
    provideHover: function (model, position) {
      return xhr("https://api.aoijs.org/api/function?function=" + model.getWordAtPosition(position).word).then(function (res) {
        let d = JSON.parse(res.responseText);
        if (d.name == "function not found") return;
        if (d.err == "" || !d.err || d.name != "function not found") {
          return {
            range: new monaco.Range(
              model.getWordAtPosition(position).startColumn,
              model.getWordAtPosition(position).endColumn,
              model.getLineCount(),
              model.getLineMaxColumn(model.getLineCount())
            ),
            contents: [
              { value: "**Function : " + model.getWordAtPosition(position).word + "**" },
              {
                value: "**Usage :** " + d.usage.replace("php", "")
              },
              {
                value: "**Description :** " + d.desc
              }, {
                value: "**Example :** " + d.example
              },
              {
                value: "**Docs :** " + d.docs
              },
            ],
          };
        }
      });
    },
  });
  var value = "\n\n\n\n\n";
  //console.log(param("file"))


  let editor = monaco.editor.create(document.getElementById('aoi'), {
    value: value,
    language: "javascript",
    minimap: { enabled: false },
    theme: 'vs-dark',
    /*wordWrap: "wordWrapColumn",
  wordWrapColumn: 40,
  // try "same", "indent" or "none"
  wrappingIndent: "none",*/
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 0,
    roundedSelection: false,
    scrollBeyondLastLine: true,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    bracketPairColorization: { enabled: true }

  });
  let editor2 = monaco.editor.create(document.getElementById('djs'), {
    value: value,
    language: "javascript",
    minimap: { enabled: false },
    theme: 'vs-dark',
    /*wordWrap: "wordWrapColumn",
  wordWrapColumn: 40,
  // try "same", "indent" or "none"
  wrappingIndent: "none",*/
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 0,
    roundedSelection: false,
    scrollBeyondLastLine: true,
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    bracketPairColorization: { enabled: true }

  });
  window.value = value;
  window.editor = editor;
  window.editor2 = editor2;
  window.monaco = monaco;
  monaco.languages.javascript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });
});


async function aoie() {
  console.log(escape(editor.getValue().trim()));
  const res = await fetch("/api/" + auth + "/aoieval?execute=" + escape(editor.getValue().trim()));
  const json = await res.json();
  document.getElementById("aoiout").innerHTML = json.data || json.error
}
async function djse() {
  console.log(escape(editor.getValue().trim()));
  const res = await fetch("/api/" + auth + "/djseval?execute=" + escape(editor2.getValue().trim()));
  const json = await res.json();
  document.getElementById("djsout").innerHTML = json.data || json.error
}