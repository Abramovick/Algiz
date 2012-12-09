/**
 *  This Module Generates new files based on the data Posted from the client.
 */

/**
 *  Load Dependencies.
 */
var HTML = require('../lib/HTMLStrings').HTML,
    fs = require('fs');


/**
 * Creates A CodeMirror Object.
 * @Functionality: - createCMValues is a function that is needed ONLY to initialize CodeMirror Values. There are two modes, public and Editable. In public, CodeMirror is displayed as readonly. And Editable is, as the word "editable" suggests, CodeMirror is displayed with write/modify mode enabled. 
 *
 * @param {Object} mode - An object with "mode" & "type" properties. The "mode" can be either 'public' or 'editable'. "type" can be either, 'both' or 'codemirror' 
 * @param {Object} props - An object containing properties sent from the client to initialize CodeMirror 
 * @return {String} - A string, containing javascript to enable CodeMirror initialisation.
 */
var createCMValues = exports.createCMValues = function (mode, props) {
   var string = "";

   if (mode.mode.toLowerCase() == "public") {
      if (mode.type.toLowerCase() == "both") {
         string += '<script type="text/javascript">document.getElementById("codeProperties").className = "showDiv"; var Editor = CodeMirror.fromTextArea( document.getElementById("textAreaCode"), { lineNumbers: true, lineWrapping: "scroll", matchBrackets: true, readOnly: "nocursor", theme: "' + props.theme + '", mode: "' + props.mode + '" }); window.Algiz = { Editor: Editor, mode: "' + props.mode + '" }; Editor.setOption( "mode", "' + props.mode + '" )</script></body></html>';
      } else if (mode.type.toLowerCase() === "codemirror") {
         string += '<script type="text/javascript">document.getElementById("codeProperties").className = "showDiv"; var Editor = CodeMirror.fromTextArea( document.getElementById("textAreaCode"), { lineNumbers: true, lineWrapping: "scroll", matchBrackets: true, readOnly: "nocursor", theme: "' + props.theme + '", mode: "' + props.mode + '" }); window.Algiz = { Editor: Editor, mode: "' + props.mode + '" }; Editor.setOption( "mode", "' + props.mode + '" )</script></body></html>';
      } else {
         console.log("Error on the 'type' attribute.");
      }
   } else if (mode.mode.toLowerCase() === "editable") {
      if (mode.type.toLowerCase() === "both") {
         string += '<script type="text/javascript">CodeMirror.commands.autocomplete = function( cm ) { CodeMirror.simpleHint( cm, CodeMirror.javascriptHint ) }; var Editor = CodeMirror.fromTextArea( document.getElementById("textAreaCode"), { lineNumbers: true, lineWrapping: "scroll", matchBrackets: true, theme: "' + props.theme + '", mode: "' + props.mode + '", extraKeys: { "Ctrl-Space": "autocomplete" }, onGutterClick: function( cm, n ) { var info = cm.lineInfo( n ); if ( info.markerText ) cm.clearMarker( n ); else cm.setMarker( n, "<span style=\'color: #900\'>â—</span> %N%" ) } }); window.Algiz = { Editor: Editor, mode: "' + props.mode + '" }; var cmm = document.querySelector( "#edit div:last-child" ).className = "CodeMirrorHide"; Editor.setOption( "mode", "' + props.mode + '" )</script></body></html>';
      } else if (mode.type.toLowerCase() === "codemirror") {
      string += '<script type="text/javascript"> document.getElementById("codeProperties").className = "showDiv"; CodeMirror.commands.autocomplete = function( cm ) { CodeMirror.simpleHint( cm, CodeMirror.javascriptHint ) }; var Editor = CodeMirror.fromTextArea( document.getElementById("textAreaCode"), { lineNumbers: true, lineWrapping: "scroll", matchBrackets: true, theme: "' + props.theme + '", mode: "' + props.mode + '", extraKeys: { "Ctrl-Space": "autocomplete" }, onGutterClick: function( cm, n ) { var info = cm.lineInfo( n ); if ( info.markerText ) cm.clearMarker( n ); else cm.setMarker( n, "<span style=\'color: #900\'>â—</span> %N%" ) } }); window.Algiz = { Editor: Editor, mode: "' + props.mode + '" }; var cmm = document.querySelector( "#edit div:last-child" ).className = "CodeMirror"; document.getElementById("textArea").style.display = "none"; Editor.setOption( "mode", "' + props.mode + '" )</script></body></html>';

    } else {
      console.log("Error on the 'type' attribute.");
    }
  } else {
    string += '<script type="text/javascript">CodeMirror.commands.autocomplete = function(cm) {CodeMirror.simpleHint(cm, CodeMirror.javascriptHint)}; var Editor = CodeMirror.fromTextArea(document.getElementById("textAreaCode"), {lineNumbers: true, lineWrapping: "scroll", matchBrackets: true, theme: "' + props.theme + '", mode: "' + props.mode + '", extraKeys: {"Ctrl-Space": "autocomplete"}, onGutterClick: function(cm, n) { var info = cm.lineInfo( n ); if (info.markerText) cm.clearMarker(n); else cm.setMarker(n, "<span style=\'color: #900\'>â—</span> %N%")}}); window.Algiz = { Editor: Editor, mode: "' + props.mode + '" }; var cmm = window.cmm = document.querySelector( "#edit div:last-child").className = "CodeMirrorHide"; Editor.setOption("mode", "' + props.mode + '" )</script></body></html>';
  }

  return string;
};


/**
 * Creates A Full HTML page, with the received POST data && CodeMirror (if used), nicely embedded.
 * @Functionality: - This function is used to create Documents on the fly. Used with the received post data, to create public & edit docs, then display them to the user.
 *
 */
exports.createDocs = function () {
  return {

/*
 * Creates a HTML page using HTML fragments, and embeds, the received POST data to the CodeMirror
 * @functionality: - situation 1.
 * --------------------------------
 * The user has only used the CodeMirror, and not the textarea, so they sent ONLY the CodeMirror data.
 * 
 * @param {Object} object - @properties - { edit, public, hash, content, mode, theme }
 * @param {Function} callback - A callback Function.
*/
    codeMirror: function (object, callback) {
      fs.writeFile(object.edit, HTML.startTextEdit + object.hash + HTML.startTextEdit2 + object.hash + HTML.startTextEdit3 + HTML.HTMLForTextAreaStart + HTML.HTMLForTextAreaEnd + HTML.HTMLForTextAreaCodeStart + object.content + HTML.HTMLForTextAreaCodeEnd + HTML.endTextEdit + createCMValues({mode: "editable", type: "CodeMirror"}, {mode: object.mode, theme: object.theme}), function (err) { if (err) { throw err; }

         fs.writeFile(object.public, HTML.startText + HTML.codeProperties + HTML.HTMLForTextAreaCodeStart + object.content + HTML.HTMLForTextAreaCodeEnd + HTML.endTextEdit + createCMValues({ mode: "public", type: "CodeMirror" }, { mode: object.mode, theme: object.theme }), function (err) {

            callback();
            console.log('Finished Writing.');
         });
      });

      console.log("situation one has run.");
    },

/*
 * Creates a HTML page using HTML fragments, and embeds, the received POST data to the textArea
 * @functionality: - situation 2.
 * -------------------------------
 * The user has only used the textarea, and not the CodeMirror, so they sent ONLY the textarea data.
 *
 * @param {Object} object - @properties - { edit, public, hash, content, theme, mode }
 * @param {Function} callback - This callback will run when the pages have finished writting.
 *
*/

    textArea: function (object, callback) {
      fs.writeFile(object.edit, HTML.startTextEdit + object.hash + HTML.startTextEdit2 + object.hash + HTML.startTextEdit3 + HTML.HTMLForTextAreaStart + object.content + HTML.HTMLForTextAreaEnd + HTML.HTMLForTextAreaCodeStart + HTML.HTMLForTextAreaCodeEnd + HTML.endTextEdit + createCMValues({ mode: "initialize" }, { mode: "javascript", theme: "default" }), function (err) {
         if (err) {
            throw err;
         }

        fs.writeFile(object.public, HTML.startText + HTML.HTMLForTextAreaPubStart + object.content + HTML.HTMLForTextAreaEnd + HTML.endText, function (err) {
            if (err) {
               throw err;
            }

          callback()
          console.log('Finished Writing.')
        })
      })

      console.log("situation 2 has run.")
    },

/*
 * Creates a HTML page using HTML fragments, and embeds, the received POST data to the CodeMirror
 * @functionality: - situation 3.
 * --------------------------------
 * the user has used BOTH the CodeMirror and the textarea, so BOT CodeMirror & textArea data is sent.
 * 
 * @param {Object} object - @properties { edit, public, hash, CMContent, TAContent, mode, theme }
 * @param {Function} callback - This callback will run when the pages have finished writting.
*/
    both: function (object, callback) {
      fs.writeFile(object.edit, HTML.startTextEdit + object.hash + HTML.startTextEdit2 + object.hash + HTML.startTextEdit3 + HTML.HTMLForTextAreaStart + object.TAContent + HTML.HTMLForTextAreaEnd + HTML.HTMLForTextAreaCodeStart + object.CMContent + HTML.HTMLForTextAreaCodeEnd + HTML.endTextEdit + createCMValues({ mode: "editable", type: "both" }, { mode: object.mode, theme: object.theme }), function (err) {
        if (err) throw err;

        fs.writeFile(object.public, HTML.startText + HTML.codeProperties +  HTML.HTMLForTextAreaPubStart + object.TAContent + HTML.HTMLForTextAreaEnd + HTML.HTMLForTextAreaCodeStart + object.CMContent + HTML.HTMLForTextAreaCodeEnd + HTML.endTextEdit + createCMValues({ mode: "public", type: "both" }, { mode: object.mode, theme: object.theme }), function (err) {

          callback()
          console.log('Finished Writing.')
        })
      })

      console.log("situation 3 has run.")
    }
  }
}