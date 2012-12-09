![Logo](https://raw.github.com/Abramovick/Algiz/master/screenshots/logo.png)

Algiz is a web application that allows users to create/upload and share resources online and access them from anywhere. Analogous to Google Docs, with Algiz you can create a document instantly or upload a document (if it’s already created using another source), edit/modify it and share it.
Algiz aims to provide a quick and fast way of sharing resources (videos, images, text files, CODE) online.

*Note: For programmers who want to share code, Algiz has a Code Editor special for writing code. Most programming & mark-up languages are supported.*


#Screenshots

__Text Editor View__: With the text editor utilities that Algiz provide, you can create documents on the fly.
![index](https://raw.github.com/Abramovick/Algiz/master/screenshots/drawing.png)

__Code Editor View__: To share documents, click the save button on the top right hand corner. A __URL__ appears underneath the logo, copy and paste it to the person you wish to share it with.
![Code Editor](https://raw.github.com/Abramovick/Algiz/master/screenshots/codeEditor.png)

__Display View__: If you where to write a document, save it and give the public URL to someone, this is how the document will look like when viewed.
![dispaly](https://raw.github.com/Abramovick/Algiz/master/screenshots/preview.png)


#Support
Algiz uses a few HTML5 technologies e.g. Local Storage, Web Sockets etc. Since IE 6 is the one that introduced the execCommand() function to allow editable docs, technically speaking, Algiz should work on IE 6 and above. *However I haven't yet implement support for any IE browser*
- Chrome 
- Safari
- Firefox 3.6+
- Opera
- IE 6+ (No support yet)


#Changelog:
##v0.1:
- Upload custom files
- Support for a Code Editor
- Support for Videos & Images upload

##v0.1.1 (Current):
- Upload custom text file support for .docx & doc files
- Bug fix for save button
- Error handling for save button (e.g. when a user tries to save a doc without writing any data inside)
- Support for uploading Code directly to the Code Editor


#Roadmap:
##v0.2:
- IE 6+ support
- Full support for Login & creating user accounts
- Ability to make files private/public
- Bug fix for paths on UNIX OS's
- Responsive Design


#Dependencies / Prerequisites:

You need to install these on your system first:

* Node: [http://nodejs.org](http://nodejs.org)
* NPM: (Comes bundled with Node. Installing Node automatically install NPM) [https://github.com/isaacs/npm](https://github.com/isaacs/npm)
* MongoDB (NOT needed for current version to work, But will be needed on next version release)

 
Libraries used:

* Express: [http://expressjs.com](http://expressjs.com)
* Jade: [http://jade-lang.com](http://visionmedia.github.com/expresso)
* Socket.io [http://socket.io](http://socket.io)
* Mime: [https://github.com/broofa/node-mime](https://github.com/broofa/node-mime)

#Installation
__This project was built and tested on Windows. Therefore, this project is *guaranteed to work on Windows*. For Operating Systems other than Windows, there are bound to be some errors somewhere including paths issues. The next release will be tested on both Windows and UNIX OS's__

##For Windows Users:
* After downloading/cloning this repo to your computer, rename it to Algiz
* Open up command prompt
<pre>
cd Algiz
npm install
node app.js
</pre>

* Now go to [http://localhost:8888](http://localhost:8888) on your browser to see the Algiz app

#Copyright
(The MIT License)

Copyright (c) 2012 Abraham Itule &lt;abraham@itule.me&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.