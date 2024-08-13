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
  var value = "Please Select A File!";
  //console.log(param("file"))


  let editor = monaco.editor.create(document.getElementById('container'), {
    value: value,
    language: "text",
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

  async function getJson(file,f) {
    let myObject = await fetch(file, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({auth: auth, file: f })
    });
    let myJson = await myObject.json();
    var type = param("file").split(".")[param("file").split(".").length - 1]
    console.log(type)
    if (type == "js") {
      type = "javascript";
    }
    else if (type == "ts") {
      type = "typescript"
    }
    else if (type == "md") {
      type = "markdown"
    }
    else if (type == "html") {
      type = "html"
    }
    else if (type == "css") {
      type = "css"
    }
    else if (type == "json") {
      type = "json"
    }
    else{
      type="text"
    }
    //type="text/"+type

    await editor.getModel().setValue(myJson.data.join("\n"));
    await monaco.editor.setModelLanguage(editor.getModel(), type);
    window.value = myJson.data.join("\n")
    window.type = type
  }
  if (!param("file")) {
    console.log("do nothing")
  } else {
    console.log("fetch " + param("file"))
    getJson("/api/file", param("file"))
  }



  window.monaco = monaco;
  monaco.languages.html.htmlDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });
  if (!param("file")) {
    console.log("do nothing")
  } else {
    console.log("fetch " + param("file"))
    getJson("/api/file",param("file"))
  }


});


/*

  monaco.languages.setMonarchTokensProvider('javascript', {
    keywords,
    tokenizer: {
      root: [
        [/@?2[a-zA-Z][\w]\*/ /*, {
cases: {
'@keywords': 'keyword',
'@default': 'variable',
}
}],
[/".*?"/, 'string'],
[/`.*?`/, 'code'],
[/\/\//, 'comment'],
[/\$[a-z-A-Z]/, 'aoiK'],
[/\$.*?\[.*?\]/, 'aoiK'],
[/module/,"m"],
[/exports/,"e"]
]
}
})
*/

function pret() {
  //let code = window.editor.getValue()
  //const options = { indent_size: 4, space_in_empty_paren: true }
  window.editor.getAction('editor.action.formatDocument').run()
  //window.editor.getModel().setValue(prettified);

}
var diffEditor;


function save1() {
  document.getElementById("container").style.display = "none";
  document.getElementById("diff").style.display = "block";
  var originalModel = monaco.editor.createModel(
    window.value,
    window.type
  );
  var modifiedModel = monaco.editor.createModel(
    editor.getValue(),
    window.type
  );


  diffEditor = monaco.editor.createDiffEditor(
    document.getElementById("diff"),
    {
      // You can optionally disable the resizing
      enableSplitViewResizing: true,

    }
  );
  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  });
  document.getElementById("save").onclick = save2;

}
async function save2() {
  let file = param("file");
  let code = editor.getValue();
  console.log(code)
  if (!file) return;
  console.log(`/api/${auth}/setFile?file=${file}&code=${escape(code)}`)
  let myObject = await fetch(`/api/setFile`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({auth: auth, file: file,code:code })
  });
  let myJson = await myObject.json();
  console.log(myJson);
  alert(myJson.data)
}
async function del() {
  let file = param("file");
  if (file == "" || !file) return;
  let d = confirm("are you sure you want to permanantly delete this file?")

  if (d == true) {
    let file = param("file");
    let myObject = await fetch(`/api/deleteFile`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({auth: auth, file: file })
    });
    let myJson = await myObject.json();
    window.location.href = "/editor";
  }
}



var a = "";

//NEW CODE HERE  
async function guildData(dir) {
  const res = await fetch("/api/dirs", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({auth: auth, dir: dir })
  });
  const json = await res.json();
  var code = ""
  var d = ""
  for (let i = 0; i < json.length; i++) {
    d = json[i].root;
    a = json[i].root;
    var somed = json[i].path.split("/")[json[i].path.split("/").length - 1]
    if(somed == json[i].path){somed = json[i].path.split("\\")[json[i].path.split("\\").length - 1]}
    if (json[i].type == "file") {
      code += `<a href="/editor?file=${json[i].path}"><div class="text-white rounded-md pl-2 py-1 bg-black m-1">${somed}</div></a>`
    }
    if (json[i].type == "dir") {
      code = `<a href="/editor?folder=${json[i].path}"><div class="text-white rounded-md pl-2 py-1 bg-black m-1">./${somed}/</div></a>` + code
    }
  }
  document.getElementById("filelistsjs").innerHTML = code;
  if (!param("folder")) {
    console.log("hid")
    document.getElementById("backbutton").style.display = "none";
  }

  return d;
}
const d = guildData(param("folder") || "root");

function back() {

  if (!param("folder")) {
    return;
  }
  else {
    let f = param("folder").split("/")[param("folder").split("/").length - 1] || param("folder").split("\\")[param("folder").split("\\").length - 1]
    window.location.href = "/editor?folder=" + param("folder").replace(f, "")
  }
}
function unnewf() {
  document.getElementById("inputf").innerHTML = ``
  document.getElementById("fileb").onclick = newf;
  document.getElementById("otherbuttons").style.display = "block";
  document.getElementById("otherbuttons").classList.add("flex flex-row")

}
function newf() {
  document.getElementById("inputf").innerHTML = `<input type="text" id="file" style="background-color:#181a1e;" class=" text-white text-sm rounded-lg h-10 m-2 focus:border-blue-500 block w-full p-2 mr-4" value="${(param("folder") || a)}" required/>`
  document.getElementById("fileb").onclick = newFile2;
  document.getElementById("otherbuttons").style.display = "none";


}

async function newFile2() {
  let v = document.getElementById("file").value;
  if (v == (param("folder") || a)) return alert("Failed to create file: enter file name please.");
  const res = await fetch(`/api/${auth}/createFile?filepath=${v}`);
  let myObject = await fetch(`/api/createFile`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({auth: auth, filepath: v })
  });
  let json = await myObject.json();
  alert(json.data);
  window.location.href = window.location.href;
}