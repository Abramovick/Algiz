define({
    addEventListener: function( element, type, handler ){
        if ( element.addEventListener ){
            element.addEventListener(type, handler, false)
        } else if ( element.attachEvent ){
            element.attachEvent( "on" + type, handler )
        } else {
            element["on" + type] = handler
        }
    },
    
    removeEventListener: function( element, type, handler ){
        if ( element.removeEventListener ){
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler)
        } else {
            element["on" + type] = null
        }
    },
    
    getClipboardText: function( event ){
        var clipboardData =  ( event.clipboardData || window.clipboardData )
        return clipboardData.getData( "text" )
    },
     
    setClipboardText: function( event, value ){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value)
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value)
        }
    },
    
    event: function( event ){
        return event ? event : window.event
    },
    
    target: function( event ){
        return event.target || event.srcElement
    },
    
    getRelatedTarget: function( event ){
        if (event.relatedTarget){
            return event.relatedTarget
        } else if (event.toElement){
            return event.toElement
        } else if (event.fromElement){
            return event.fromElement
        } else {
            return null
        }
    
    },
    
    getWheelDelta: function( event ){
        if (event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
        } else {
            return -event.detail * 40
        }
    },
    
    getButton: function( event ){
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },
    
    keyCode: function( event ){
        if ( typeof event.charCode == "number" ){
            return event.charCode
        } else {
            return event.keyCode
        }
    },
    
    preventDefault: function( event ){
        if ( event.preventDefault ){
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },
  
    stopPropagation: function( event ){
        if ( event.stopPropagation ){
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    },

    caret : function () {
        var saveSelection, restoreSelection;
        if (window.getSelection) {
            // IE 9 and non-IE
            saveSelection = function() {
                var sel = window.getSelection(), ranges = []
                if (sel.rangeCount) {
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        ranges.push(sel.getRangeAt(i))
                    }
                }
                return ranges
            };

            restoreSelection = function(savedSelection) {
                var sel = window.getSelection()
                sel.removeAllRanges()
                for (var i = 0, len = savedSelection.length; i < len; ++i) {
                    sel.addRange(savedSelection[i])
                }
            };
        } else if (document.selection && document.selection.createRange) {
            // IE <= 8
            saveSelection = function() {
                var sel = document.selection
                return (sel.type != "None") ? sel.createRange() : null
            };

            restoreSelection = function(savedSelection) {
                if (savedSelection) {
                    savedSelection.select()
                }
            };
        }

        return {
            saveSelection: saveSelection,
            restoreSelection: restoreSelection
        }
    },

    // returns true if the browser supports local storage.
    localStorage : function() {    
        try {        
            if ( window.localStorage ) {            
                return true
            }
            else {
                return false
            }
        }
        catch (ex) {            
            return ex
        }
    },

    // hash creator.
    createHash: function ( ) {
        var alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

        var hash = alphabets[ Math.floor( Math.random() * 26 )].toUpperCase() + Math.floor( Math.random() * 26 ) + alphabets[ Math.floor( Math.random() * 26 )] +  new Date().getTime() + alphabets[ Math.floor( Math.random() * 26 )] +  "" + new Date().getDate() + alphabets[ Math.floor( Math.random() * 26 )] + "" + new Date().getMonth() + alphabets[ Math.floor( Math.random() * 26 )] + alphabets[ Math.floor( Math.random() * 26 )].toUpperCase() + "" + new Date().getFullYear() + alphabets[ Math.floor( Math.random() * 26 )] + alphabets[ Math.floor( Math.random() * 26 )] + "" + Math.floor( Math.random() * 100000 )

        hash += alphabets[ Math.floor( Math.random() * 26 )]

        return hash
    },

    createSubmitForm: function (bool) {
        var form = document.createElement( 'Form' )
        form.action = '/post'
        form.method = 'post'

        function escapeHTML ( string ) {
            return String(string).replace(/</g, '&lt;').replace(/>/g,'&gt;')
        }

        if (bool) {
            var reSaveEdit = document.createElement( 'input' );
            var reSavePublic = document.createElement( 'input' );
            reSaveEdit.name = 'saveToEdit';
            reSavePublic.name = 'saveToPublic';
            reSaveEdit.type = 'text';
            reSavePublic.type = 'text';
            reSaveEdit.value = document.location.pathname.substr(1);
            reSavePublic.value = Algiz.ID.publicURL.value.slice(Algiz.ID.publicURL.value.lastIndexOf("/") + 1);
        }

        //The texts inside the form
        // to be more efficient, lets check is the textarea has text, coz if it doesn't
        // then it makes no sense to send it.

        // situation 1.
        // there's only text in the CodeMirror Editor, and there's no text in 
        // textarea. therefore ONLY send data from the CodeMirror.
        if ( ( Algiz.Editor.getValue() !== "" ) && ( Algiz.ID.textArea.innerHTML === "" || Algiz.ID.textArea.innerHTML === "<br>" ) ) {

            var textAreaCode = document.createElement( 'textarea' )
            textAreaCode.name = 'textAreaCode'
            textAreaCode.innerHTML = escapeHTML( Algiz.Editor.getValue() )

            // I need 2 things for the codeMirror
            // 1. Mode && 2. theme
            var mode = document.createElement( 'input' )
            var theme = document.createElement( 'input' )
            mode.name = 'mode'
            theme.name = 'theme'
            mode.type = 'text'
            theme.type = 'text'
            mode.value = Algiz.Editor.getOption('mode')
            theme.value = Algiz.Editor.getOption('theme')

            form.appendChild( textAreaCode )
            form.appendChild( mode )
            form.appendChild( theme )

            if (reSaveEdit && reSavePublic) {
                form.appendChild(reSaveEdit)
                form.appendChild(reSavePublic)
            }

            document.body.appendChild( form )
            return form

        // situation 2.
        // there's only text in the textarea, and there's not text in the CodeMirror
        } else if ( Algiz.Editor.getValue() === "" &&  Algiz.ID.textArea.innerHTML !== "" && Algiz.ID.textArea.innerHTML !== "<br>" ) {

            var textArea = document.createElement( 'textarea' )
            textArea.name = 'textArea'
            textArea.innerHTML = document.getElementById('textArea').innerHTML

            form.appendChild( textArea )

            if (reSaveEdit && reSavePublic) {
                form.appendChild(reSaveEdit)
                form.appendChild(reSavePublic)
            }

            document.body.appendChild( form )
            return form

        // situation 3
        // there's text inside both places.
        } else if ( Algiz.Editor.getValue() !== "" &&  Algiz.ID.textArea.innerHTML !== "" && Algiz.ID.textArea.innerHTML !== "<br>" ) {

            var textAreaCode = document.createElement( 'textarea' )
            textAreaCode.name = 'textAreaCode'

            var textArea = document.createElement( 'textarea' )
            textArea.name = 'textArea'

            textAreaCode.innerHTML = escapeHTML( Algiz.Editor.getValue() )
            textArea.innerHTML = document.getElementById('textArea').innerHTML

            // I need 2 things for the codeMirror
            // 1. Mode && 2. theme
            var mode = document.createElement( 'input' )
            var theme = document.createElement( 'input' )
            mode.type = 'text'
            theme.type = 'text'
            mode.value = Algiz.Editor.getOption('mode')
            theme.value = Algiz.Editor.getOption('theme')

            form.appendChild( textAreaCode )
            form.appendChild( textArea )

            form.appendChild( mode )
            form.appendChild( theme )

            if (reSaveEdit && reSavePublic) {
                form.appendChild(reSaveEdit)
                form.appendChild(reSavePublic)
            }

            document.body.appendChild( form )
            return form

        } else if ( Algiz.Editor.getValue() === "" &&  ( Algiz.ID.textArea.innerHTML === "" || Algiz.ID.textArea.innerHTML === "<br>" ) ) {

            alert('Please Enter Something before Saving Changes.')
            return
        }
    }
})