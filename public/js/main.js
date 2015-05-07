"use strict";

// fn from http://underscorejs.org/docs/underscore.html
// https://github.com/jashkenas/underscore/blob/master/LICENSE
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = Date.now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

var editor = ace.edit("editor"),
    session = editor.getSession(),
    Range = ace.require('ace/range').Range;

var error = document.getElementById("error");
var tree = document.getElementById("tree");
var treeContainer = document.getElementById("tree-container");


var markers = [];

function displayError(exception) {
  hideError();
  if (exception.line) {
    session.setAnnotations([{
      row: exception.line,
      column: exception.column,
      text: exception.description,
      type: "error" // also warning and information
    }]);
    markers.push(session.addMarker(new Range(exception.line, 0, exception.line , 1), "syntax-error", "fullLine"));
  }
  treeContainer.classList.add("error");
}

function hideError() {
  session.clearAnnotations();
  markers.forEach(function(marker){
    session.removeMarker(marker);
  });
}


function displayTree(ast) {
  hideError();
  treeContainer.classList.remove("error");
  tree.display(ast);
}

editor.setTheme("ace/theme/monokai");
session.setOption("useWorker", false);
session.setMode("ace/mode/javascript");

function onChange() {
  var code = editor.getValue();
  try {
    var ast = shift.parseModule(code, { loc: false, earlyErrors : true });
    displayTree(ast);
  } catch (ex) {
    displayError(ex);
  }
}

editor.getSession().on('change', debounce(onChange, 300));


window.addEventListener('polymer-ready', function () {
  onChange();
})


