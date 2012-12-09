/*
	ALL Events are handled here.
*/

define([
'EventUtil', 'id', 'lib/modalDialogue'
],  function ( EventUtil, ID, modal ) {
		var num = 0

		return function ( event ) {
			var e = EventUtil.event( event )
			var target = EventUtil.target( e )

			function execute ( cmd, value ) {
				document.execCommand( cmd, false, value )
			}

			function toggleClicked ( node, check ) {
				var range = document.getSelection().getRangeAt(0),
					selected = false

				var check = check || false;
				(check) ? selected = true : selected = !( range.toString().length > 0 )

				if ( selected ) {
					if ( node.className == "" ) {
						node.className = "clicked"
					} else if ( node.className == "clicked" ) {
						node.className = ""
					}
				}

				ID.textArea.focus()
			}

			switch ( target.id ) {
				case "imgLogo": {
					document.location.href = "http://localhost:8888/"
				}
				break;

				case "codeIcon" : {
					// basically, i have another div that i handled by CodeMirror, which gives it a 
					// functionality as a code text edit. 
					// I want the ability to switch between those two divs when this buttons is clicked.
					// The text inside the divs should also be updated while the switch is happening.
					var txtAraCode = document.querySelector( "#edit div:last-child" )

					if ( num == 0 || num == 1 ) {
						ID.textArea.style.display = "none"
						txtAraCode.className = "CodeMirror"

						document.getElementById('codeProperties').className = "showDiv"

						num++
					
						ID.codeIcon.className = "clicked"
					}

					if ( num == 2 ) {
						ID.textArea.style.display = "block"
						txtAraCode.className = "CodeMirrorHide"
						num = 0;

						document.getElementById('codeProperties').className = "hideDiv"

						if ( ID.codeIcon.className == "clicked" ) {
							ID.codeIcon.className = ""
						}
					}
				}
				break;

				case "codeIconEdit" : {
					if ( ID.textArea.innerHTML !== "" || ID.textArea.innerHTML !== "<br>" ) {
						if ( num == 0 || num == 1 ) {
							ID.textArea.style.display = "none"
							document.querySelector( "#edit div:last-child" ).className = "CodeMirror"
							document.getElementById( 'codeProperties' ).className = "showDiv"
							num++
							ID.codeIconEdit.className = "clicked"
						}

						if ( num == 2 ) {
							ID.textArea.style.display = "block"
							document.querySelector( "#edit div:last-child" ).className = "CodeMirrorHide"
							num = 0;
							document.getElementById('codeProperties').className = "hideDiv"
							if ( ID.codeIconEdit.className == "clicked" ) {
								ID.codeIconEdit.className = ""
							}
						}
					}
				}
				break;

				case "boldIcon" : {
					execute( "bold", null )

					//toggle clicked or unclicked					
					toggleClicked( ID.boldIcon )
				}
				break;

				case "italicsIcon" : {
					execute( "italic", null )

					toggleClicked ( ID.italicsIcon )
				}
				break;

				case "underlineIcon" : {
					execute( "underline", null )
					toggleClicked ( ID.underlineIcon )
				}
				break;

				case "strikeIcon" : {
					execute( "strikethrough", null )
					toggleClicked ( ID.strikeIcon )
				}
				break;

				case "cutIcon" : {
					execute( "cut", null )
					toggleClicked ( ID.cutIcon )
				}
				break;

				case "copyIcon" : {
					execute( "copy", null )
					toggleClicked ( ID.copyIcon )
				}
				break;

				case "pasteIcon" : {
					execute( "paste", null )
					toggleClicked ( ID.pasteIcon )
				}
				break;

				case "undoIcon" : {
					execute( "undo", null )
				}
				break;

				case "redoIcon" : {
					execute( "redo", null )
				}
				break;

				case "superscriptIcon" : {
					execute( "superscript", null )
					toggleClicked ( ID.superscriptIcon )
				}
				break;

				case "subscriptIcon" : {
					execute( "subscript", null )
					toggleClicked ( ID.subscriptIcon )
				}
				break;

				case "alignleftIcon" : {
					execute( "justifyleft", null )
				}
				break;

				case "alignrightIcon" : {
					execute( "justifyright", null )
				}
				break;

				case "aligncenterIcon" : {
					execute( "justifycenter", null )
				}
				break;

				case "justifyIcon" : {
					execute( "justifyfull", null )
				}
				break;

				case "ulIcon" : {
					execute( "insertunorderedlist", null )
					toggleClicked ( ID.ulIcon )
				}
				break;

				case "olIcon" : {
					execute( "insertorderedlist", null )
					toggleClicked ( ID.olIcon )
				}
				break;

				case "indentIcon" : {
					execute( "indent", null )
				}
				break;

				case "outdentIcon" : {
					execute( "outdent", null )
				}
				break;

				case "fontStyle" : {
					(function () {
						function getVal ( elem, callback ) {
							var res = null
							if ( typeof elem.value == "string" && elem.value != "" ) {
								res = elem.options[elem.selectedIndex].value
								console.log( elem.options[elem.selectedIndex].value )
								console.log( elem.selectedIndex )
								console.log( res )

								if ( res ) {							
									callback ( res )
								} else {
									console.log("Failed")
								}
							}
						}

						getVal ( ID.fontStyle, function ( value ) {
							execute( "fontname", value )
							ID.textArea.focus()
						})
					})()
					
					ID.textArea.focus()
				}
				break;
				
				case "fontSize" : {		
					function getVal ( elem, callback ) {
						var res = null
						if ( typeof elem.value == "string" && elem.value != "" ) {
							res = parseInt( elem.value, 10 )
							console.log( res )

							if ( res && typeof res == "number" ) {					
								callback ( res )
							} else {
								console.log("Failed")
							}
						}
					}

					getVal ( ID.fontSize, function ( value ) {
						execute( "fontsize", value )
						ID.textArea.focus()
					})
				}
				break;

				case "fontcolorIcon" : {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection()

					modal.createMultiView({
						title : "Font Colour",
						"views" : [{
							"title" : "Color Name / Hex Code",
							"body" : "- Set Font Color by entering a color name (e.g. blue) Or<br/>" +
										"- Set Font Color by entering a Hexadecimal code (e.g. #ddd)",
							"form" : {
								"name" : "color",
								"inputs" : [{
									"title" : "Color Name / Hex Code:",
									"name" : "colorCode",
									"placeholder" : "#0000"
								}]
							}
						}],
						buttons : {
							'Apply' : function () {
								var retValue = document.color.colorCode.value

								//execute if there is a value set.
								if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {
									// restore where the caret was.
									EventUtil.caret().restoreSelection( sel )
									execute( 'forecolor', retValue )
									ID.textArea.focus()
								}
								//close the dialogue
								this.close()
							},
							'Cancel' : function () {
								this.close()
							}
						}
					})
				}
				break;

				case "backcolorIcon" : {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection();

					modal.createMultiView({
						title : "Background Colour",
						"views" : [{
							"title" : "Color Name / Hex Code",
							"body" : "- Set Background Color by entering a color name (e.g. blue) Or<br/>" +
										"- Set Background Color by entering a Hexadecimal code (e.g. #ddd)",
							"form" : {
								"name" : "color",
								"inputs" : [{
									"title" : "Color Name / Hex Code:",
									"name" : "colorCode",
									"placeholder" : "#0000"
								}]
							}
						}],
						buttons : {
							'Apply' : function () {
								var retValue = document.color.colorCode.value

								//execute if there is a value set.
								if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {
									// restore where the caret was.
									EventUtil.caret().restoreSelection( sel );
									execute( 'backcolor', retValue )
									ID.textArea.focus()
								}
								//close the dialogue
								this.close()
							},	
							'Cancel' : function () {
								this.close()
							}
						}
					})			
				}
				break;

				case "insertimageIcon" : {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection();

					modal.createMultiView({
						title : "Insert Image",
						"views" : [{
							"title" : "Image Web Link",
							"body" : "Enter image web URL/Link",
							"form" : {
								"name" : "imageLink",
								"inputs" : [{
									"type"  : "textarea",
									"name" : "link"
								}]
							}
						}, {
							"title" : "Upload Local Image",
							"body" : "Choose image from your computer to upload.",
							"form" : {
								"name" : "ImageUploadImage",
								"action": "/upload",
								"method": "POST",
								"enctype": "multipart/form-data",
								"inputs" : [{
									"title" : "Upload Image: ",
									"type": "file",
									"name" : "localLink",
									"multiple" : "multiple"
								}]
							}
						}],
						buttons : {
							'Apply' : function () {
								(function () {									
									if ( document.imageLink ) {
										var retValue = document.imageLink.link.value

										//execute if there is a value set.
										if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {
											// restore where the caret was.
											EventUtil.caret().restoreSelection( sel );
											execute( "insertimage", retValue )
											ID.textArea.focus()
										}
									}

									if ( document.ImageUploadImage ) {
										var retValue = document.ImageUploadImage.localLink.value

										//execute if there is a value set.
										if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {

										}
									}
								})()

								//close the dialogue
								this.close()
							},
							'Cancel' : function () {
								this.close()
							}
						}
					})
				}
				break;

				case "insertvideoIcon" : {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection();

					modal.createMultiView({
						title : "Insert Video",
						"views" : [{
							"title" : "Embeded Code",
							"body" : "Enter video Embeded Code",
							"form" : {
								"name" : "videoLink",
								"inputs" : [{
									"type" : "textarea",
									"name" : "link"
								}]
							}
						},	{
							"title" : "Upload Video file",
							"body" : "Choose Video from your computer to upload. Maximum Size: 1GB",
							"form" : {
								"name" : "VideoUploadFile",
								"inputs" : [{
									"title" : "Upload Video File: ",
									"type": "file",
									"name" : "localLink"
								}]
							}
						}],
						buttons : {
							'Apply' : function () {
								(function () {									
									if ( document.videoLink ) {
										var retValue = document.videoLink.link.value

										//execute if there is a value set.
										if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {
											// restore where the caret was.
											EventUtil.caret().restoreSelection( sel );
											execute( "inserthtml", retValue )
											ID.textArea.focus()
										}
									}
								})()

								//close the dialogue
								this.close()
							},
							'Cancel' : function () {
								this.close()
							}
						}
					})
				}
				break;

				case "linkIcon" : {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection();

					modal.createMultiView({
						title : "Links",
						"views" : [{
							"title" : "Create Link",
							"body" : "To create a link, Enter a URL of the link and the appearing text. <br/>If text is highlighted, Enter the URL ONLY and ignore the link text option.",
							"form" : {
								"name" : "createLink",
								"inputs" : [{
									"title" : "Link URL: ",
									"name" : "url",
									"placeholder": "Example: http://www.google.com",
									"style": "width: 250px"
								},{
									"title" : "Link Text: ",
									"name" : "linkText",
									"placeholder": "E.g. Google **Ignore this option if text is highlighted**",
									"style": "width: 300px"
								}]
							}
						}, {
							"title" : "Remove Link",
							"body" : "Removes a link. *** Only works on highlighted text. ****",
							"form" : {
								"name" : "unlink",
								"inputs" : [{
									"title" : "To Unlink/Remove Link, Click the Apply button",
									"name" : "url",
									"placeholder": "To Unlink, just click the Apply button",
									"style": "width: 250px; display: none;"
								}]
							}
						}],
						buttons : {
							'Apply' : function () {
								(function () {									
									if ( document.createLink ) {
										var url = document.createLink.url.value
										var linkText = document.createLink.linkText.value

										//execute if there is a value set.
										if ( ( typeof url == "string" && url.length > 0 && url != "" ) &&  ( typeof linkText == "string" && linkText.length > 0 && linkText != "") ) {

											// restore where the caret was.
											EventUtil.caret().restoreSelection( sel );
											execute( "inserthtml", "<a style='font-family: inherit; font-size: inherit;' href="+ url + ">"+ linkText + "</a>" )
											ID.textArea.focus()
										} else if ( typeof url == "string" && url.length > 0 && url != "" ) {

											// restore where the caret was.
											EventUtil.caret().restoreSelection( sel );
											execute( "createlink", url )
											ID.textArea.focus()
										}										
									}

									if ( document.unlink ) {									
										// restore where the caret was.
										console.log("was here.")
										EventUtil.caret().restoreSelection( sel );
										execute( "unlink", null )
										ID.textArea.focus()
									}
								})()

								//close the dialogue
								this.close()
							},
							'Cancel' : function () {
								this.close()
							}
						}
					})
				}
				break;

				case "tableIcon" : {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection();

					function makeTable ( rows, columns ) {
						var bigString = "<table class='table'>"

						function give ( num, value ) {
							var res = ""
							for ( var i = 1; i <= num; i++ ) {
								res += value
							}
							return res
						}

						bigString += give( rows, "<tr>" + give( columns, "<td class='tableTD'></td>" ) +"</tr>" ) + "</table>"
						return bigString;
					}

					modal.createSingle({
						title : "Create Table",
						body : "Set the table's properties",
						"form" : {
							"name": "tableOpts",
							"inputs": [{
								"title": "Table Rows:",
								"name": "rows",
								"placeholder": "3"
							}, {
								"title": "Table Columns:",
								"name": "columns",
								"placeholder": "6"
							}, {
								"title": "Table Cell Width:",
								"name": "tableWidth",
								"placeholder": "50"
							}, {
								"title": "Table Cell Height:",
								"name": "tableHeight",
								"placeholder": "50"
							}]
						},
						buttons : {
							'Apply' : function () {						
								if ( document.tableOpts ) {
									var rows = parseInt(document.tableOpts.rows.value)
									var columns = parseInt(document.tableOpts.columns.value)

									//execute if there is a value set.
									if ( (typeof rows == "number" && rows > 0) && (typeof columns == "number" && columns > 0) ) {
										// restore where the caret was.
										EventUtil.caret().restoreSelection( sel );
										console.log("rows: " + rows + "\ncolumns: " + columns)
										console.log( makeTable( rows, columns) )										
										execute( "inserthtml", makeTable( rows, columns) )
										ID.textArea.focus()
									}
								}

								this.close()
							},
							'Cancel' : function () {
								this.close()
							}
						}
					})
				}
				break;

				case "hrIcon" : {
					execute( "inserthtml", "<hr style='border: 1px solid #888; color: #ddd' />" )
				}
				break;

				case "hashIcon" : {
					ID.textArea.style.lineHeight = 1.5
					toggleClicked ( ID.hashIcon )
				}
				break;

				case "settingsIcon": {
					// save where the caret was left.
					var sel = EventUtil.caret().saveSelection();

					modal.createMultiView({
						title : "Settings",
						"views" : [{
							"title" : "Server Name",
							"body" : "Enter a Server Name to upload files to",
							"form" : {
								"name" : "serverName",
								"inputs" : [{
									"title" : "Server Name:",
									"name" : "server",
									"placeholder": "itule.me"
								}]
							}
						}, {
							"title" : "Default Font",
							"body" : "Set Default Font",
							"form" : {
								"name" : "defaultFont",
								"inputs" : [{
									"title" : "Font Name:",
									"name" : "fontName",
									"placeholder": "Arial"
								}, {
									"title" : "Font Size:",
									"name" : "fontSize",
									"placeholder": "12"
								}]
							}
						}],
						buttons : {
							'Apply' : function () {						
								if ( document.serverName ) {
									var retValue = document.serverName.server.value

									//execute if there is a value set.
									if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {
										// restore where the caret was.
										EventUtil.caret().restoreSelection( sel );
										
										// Implement details to the server to upload to here.

										ID.textArea.focus()
									}
								} 

								if ( document.defaultFont ) {
									var fontName = document.defaultFont.fontName.value
									var fontSize = parseInt(document.defaultFont.fontSize.value)

									//execute if there is a value set.
									if ( (typeof fontName == "string" && fontName.length > 0 && fontName != "") && 
										  (typeof fontSize == "number" && fontSize > 0)) {
										// restore where the caret was.
										EventUtil.caret().restoreSelection( sel );
										execute( "fontname", fontName )
										execute( "fontsize", fontSize )
										ID.textArea.focus()
									}
								}

								//close the dialogue
								this.close()
							}, 
							'Cancel': function () {
								this.close()
							}
						}
					})
				}
				break;

				/*
					Event handler for the Upload Icon on the top left corner.
					The idea is that, when the user clicks upload, they can load a file
					from their computer into the browser. That files content will then 
					appear on the page, and be editable.
				*/
				case "imgUpload": {
					modal.createSingle({
						title: "Upload Document",						
						body : "Load a document from your computer. *** Only text documents and Images supported **** " +
							" Note: If your loading Code, then select 'Code' on the (Load file to) option, for the code to be loaded into the Code Editor. ",
						"form" : {
							"name": "loadDoc",
							"action": "/upload",
							"method": "POST",
							"enctype": "multipart/form-data",
							"inputs": [{
								"title": "Load Document: ",
								"type": "file",
								"name": "load",
								"multiple" : "multiple"
							}, {
								"title": "Load file to: ",
								"type": "select",
								"name": "loadTo",
								"options": [ "Default", "CodeEditor" ]
							}]
						},
						buttons : {
							'Load' : function () {			
								if ( document.loadDoc ) {
									var retValue = document.loadDoc.load.value
									var loadTo = document.loadDoc.loadTo.value

									//execute if there is a value set.
									if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {
										/*
											If the user has entered a value, first save watever the user had in the 
											textArea. 
											Then post that document so as it can be loaded at the server.
									 	*/

									 	// Save using local storage, store watever the user left.
									 	if ( EventUtil.localStorage() ) {
									 		localStorage["prevTextareaInnerHTML"] = ID.textArea.innerHTML
									 		localStorage["prevTextareaInnerText"] = ID.textArea.innerText
									 	}
										
									 	//Implement an error check for invalid files.

									 	//submit document
										document.loadDoc.submit()
									}
								}

								this.close()
							}, 
							'Cancel': function () {
								this.close()
							}
						}
					})
				}
				break;

				// Event handler for the Save button at the top right corner.
				case "imgNewDoc": {
					document.location.href = "http://localhost:8888/"
				}
				break;

				// Event handler for the Save button at the top right corner.
				case "imgSave": {
					var form = EventUtil.createSubmitForm(false);
					if ( form ) form.submit()
				}
				break;

				// Event handler for the Save button at the top right corner. imgSaveEdit is different
				// because it doenst create a new hash key, instead it uses the same hash key to save its
				// files.
				case "imgSaveEdit": {
					var form = EventUtil.createSubmitForm(true);
					if ( form ) form.submit()
				}
				break;

				case "select" : {
					var theme = ID.input.options[ ID.input.selectedIndex ].innerHTML
					Algiz.Editor.setOption( "theme", theme )

					var choice = document.location.search && document.location.search.slice( 1 )

				  	if ( choice ) {
				    	ID.input.value = choice
				    	Algiz.Editor.setOption( "theme", choice )
				  	}
				}
				break;

				case "lang": {
					modal.createSingle({
						title: "Choose Programming Language.",						
						body : "Select the Programming Language you are going to write.",
						"form" : {
							"name": "lang",
							"inputs": [{
								"title": "Language: ",
								"type": "select",
								"name": "language",
								"options": [ "HTML", "CSS", "JavaScript", "XML", "CoffeeScript",  "PHP", "Pascal", "Perl", "Python", "Ruby",  "Haskell", "Less", "MySQL","Erlang","Scheme", "Shell", "SmallTalk", "VB", "YAML", "VBScript", "Clike", "clojure", "Diff", "ECL" ]
							}]
						},
						buttons : {
							'Load' : function () {				
								if ( document.lang ) {
									var retValue = document.lang.language.value
								
									//execute if there is a value set.
									if ( typeof retValue == "string" && retValue.length > 0 && retValue != "" ) {

/**
	************************************************************************
	************************************************************************

	IMPLEMENT ALL PROGRAMMING LANGUAGES MODE ON THE CODE MIRROR EDITIOR.
					***REMOVE ME WHEN YOUR DONE ***	

	************************************************************************
	************************************************************************
*/
										if( retValue.toLowerCase() === "javascript" ) {
											Algiz.Editor.setOption( "mode", "javascript" )
										} else if ( retValue.toLowerCase() === "xml" ) {
											Algiz.Editor.setOption( "mode", "xml" )
										} else if ( retValue.toLowerCase() === "html" ) {
											Algiz.Editor.setOption( "mode", "text/html" )
											Algiz.Editor.setOption( "tabMode", "indent" )
										} 
									}
								}

								this.close()
							}, 
							'Cancel': function () {
								this.close()
							}
						}
					})
				}
				break;

				case "instructions": {
					modal.createSingle({
						title: "Instructions Panel.",	

/**
	************************************************************************
	************************************************************************

	CLEARLY STATE OUT, ALL THE INSTRUCTIONS OF HOW TO USE THE EDITOR. 
	MAKE SURE ITS ALSO NICELY FORMATTED IN CSS.
					***REMOVE ME WHEN YOUR DONE ***	

	************************************************************************
	************************************************************************
*/

						body : "These Instructions will help you use the Editor to its full potential",
						buttons : { 
							'Close': function () {
								this.close()
							}
						}
					})
				}
				break;

				case "HTMLComplete": {
					if ( ID.HTMLCompletion.checked == true ) {
						Algiz.Editor.setOption( "mode", "text/html" )
						Algiz.Editor.setOption( "extraKeys", {
							"'>'": function(cm) { cm.closeTag(cm, '>') },
							"'/'": function(cm) { cm.closeTag(cm, '/') }
						})
					} else {
						Algiz.Editor.setOption( "mode", "javascript" )
					}
				}
				break;

			}
		}
	})