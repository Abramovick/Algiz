requirejs.config({
	baseUrl: "js/helper",
	paths: {
		lib: "modalDialogue"
	},
	deps: [
		"CodeMirror/lib/util/simple-hint",
	    "CodeMirror/lib/util/javascript-hint", "CodeMirror/lib/util/dialog",
    	"CodeMirror/lib/util/searchcursor", "CodeMirror/lib/util/search",
		"CodeMirror/lib/util/closetag", "CodeMirror/mode/css/css",
		"CodeMirror/mode/javascript/javascript", "CodeMirror/mode/xml/xml",
		"CodeMirror/mode/htmlmixed/htmlmixed", "CodeMirror/mode/clike/clike", 
		"CodeMirror/mode/clojure/clojure", "CodeMirror/mode/coffeescript/coffeescript", 
		"CodeMirror/mode/diff/diff", "CodeMirror/mode/ecl/ecl", "CodeMirror/mode/erlang/erlang", 
		"CodeMirror/mode/haskell/haskell", "CodeMirror/mode/htmlembedded/htmlembedded",
		"CodeMirror/mode/less/less", "CodeMirror/mode/mysql/mysql", "CodeMirror/mode/php/php",
		"CodeMirror/mode/pascal/pascal", "CodeMirror/mode/perl/perl", "CodeMirror/mode/python/python",
		"CodeMirror/mode/ruby/ruby", "CodeMirror/mode/scheme/scheme", "CodeMirror/mode/shell/shell",
		"CodeMirror/mode/smalltalk/smalltalk", "CodeMirror/mode/vb/vb", "CodeMirror/mode/yaml/yaml",
		"CodeMirror/mode/vbscript/vbscript"
    ]
})

requirejs([
	'EventUtil', 'id', 'Navigation'
	], function ( EventUtil, ID, handler ) {
		EventUtil.addEventListener( document, "click", handler )
		EventUtil.addEventListener( document, "change", handler )
		EventUtil.addEventListener( document, "keydown", handler )

		if ( ID.codeProperties ) {
			EventUtil.addEventListener( ID.codeProperties, "change", handler )
		}

		if ( ID.textArea ) {
			ID.textArea.focus()
		}
		
	   	// if the path is '/upload', then that means the user had uploaded something.
	   	// But because before uploading anything, the current document is saved on localStorage,
	   	// Then you want to first load EVERYTHING back from the localStorage.
	   	if ( document.location.pathname == "/upload" && localStorage.prevTextareaInnerHTML ) {
	  	 	ID.textArea.innerHTML += localStorage.prevTextareaInnerHTML
	  	}

	   	// Initialize CodeMirror at Startup. This is for the Index page.
	   	if ( document.querySelector( "#edit[ class = 'editDefault' ]" ) ) {
		   	// initiliaze CodeMirror, to allow coding.
	      	CodeMirror.commands.autocomplete = function( cm ) {
	       		CodeMirror.simpleHint( cm, CodeMirror.javascriptHint )
	      	}

	      	var Editor = CodeMirror.fromTextArea( ID.textAreaCode, {
	      		value: "",
	        	lineNumbers: true,
	   			matchBrackets: true,
	      		mode: "javascript",
				lineWrapping: "noscroll",
	      		extraKeys: { "Ctrl-Space": "autocomplete" },
	  			onGutterClick: function( cm, n ) {
	          		var info = cm.lineInfo( n );
	          		if ( info.markerText )
	            		cm.clearMarker( n );
	          		else
	            		cm.setMarker( n, "<span style=\"color: #900\">â—</span> %N%" );
	        	}
	     	})

			// The codeMirror Div should hide first, then only show when the code button is clicked.
			var cmm = document.querySelector( "#edit div:last-child" ) || document.querySelector( "#pubContent div:last-child" )
			cmm.className = "CodeMirrorHide"
		}

		// Since the initialization for editable page is done on the server, one feature seems not to work
		// And that is the mode feature. Therefore, set it on the client
	   	if ( document.querySelector( "div#edit[ class='editEditableDoc' ]" ) && Algiz.Editor.getValue() !== "" ) {
			Algiz.Editor.setOption( "mode", Algiz.mode )
			Algiz.Editor.setOption( "lineWrapping", "noscroll" )
		}

		// Once again the initialization for public page is done on the server, 
		// And the mode feature doesnt work, so set it to work on the client.
		if ( document.querySelector( '#pubContent #textAreaCode' ) ) {
			Algiz.Editor.setOption( "mode", Algiz.mode )
		}

	   	// Export my main functions to window
	   	if ( !window.Algiz && typeof window.Algiz == "undefined" ) {
			window.Algiz = {
				EventUtil: EventUtil,
				ID: ID,
				handler: handler,
				Editor: Editor
			}
		} else if (window.Algiz.Editor) {
			window.Algiz.EventUtil = EventUtil;
			window.Algiz.ID = ID;
			window.Algiz.handler = handler;
		}
	}
)