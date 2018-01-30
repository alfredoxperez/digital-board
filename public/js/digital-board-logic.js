const socket = io();

socket.on('connect', () => {
  $.ajax({
    url: 'http://localhost:3000/digital-board/api/1.0/text',
    contentType: 'application/json',
    type: 'GET',
    data: '',
    success: function (data) {
      data.forEach(d => 
        $('#digital-board').val(d.boardText + '\n' + $('#digital-board').val()))
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("digital-board-logic.js: error: ", xhr.statusText)
    }
  })
})

socket.on('outboundDigitalboardSocket', data => {
  //if new entry then just add it to the top...
  if(data.row == -1) {
    $('#digital-board').val(data.boardText + '\n' + $('#digital-board').val())
  } else {
    //else we have an edited entry and need to insert it and update textarea...
    let textLines = $('#digital-board').val().substr(0).split("\n")
    textLines[data.row-1] = data.boardText
    
    $('#digital-board').val(textLines
      .reduce((accumulator, currentValue) => accumulator + '\n' + currentValue))
  }
})


function checkEnter(e){ 
  //e is event object passed from function invocation
  //literal character code will be stored in this variable
  let characterCode 
  
  //if which property of event object is supported (NN4)
  if(e && e.which){ 
    e = e
    //character code is contained in NN4's which property
    characterCode = e.which 
  } else {
    e = event
    //character code is contained in IE's keyCode property
    characterCode = e.keyCode 
  }
  
  //13 = enter key
  if(characterCode == 13){ 
    submitText()
    return false
  } else{
    return true
  }
}

function submitText() {
  let inText = $('#new-text-input').val()
  $('#new-text-input').val('')
  if(inText) {
    //https://gist.github.com/emptyhammond/1603144
    $.ajax({
      url: 'http://localhost:3000/digital-board/api/1.0/text',
      contentType: 'application/json',
      type: 'PUT',
      data: '{"inputText": "' + inText + '"}',
      success: function (response) {
        //TODO: confirm message?
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log("digital-board-logic.js: error: ", xhr.statusText)
      }
    })
  }
}


let clickTimer = null
function checkTextAreaClick(textarea) {
  if (clickTimer == null) {
    //Single Tap
    clickTimer = setTimeout( () => {clickTimer = null}, 500)
  } else {
    //Double Tap
    clearTimeout(clickTimer)
    clickTimer = null
    strikethroughText(textarea)
  }
}

function strikethroughText(textarea){
  let textLines = textarea.value.substr(0, textarea.selectionStart).split("\n")
  let position = {
    row: textLines.length,
    column: textLines[textLines.length-1].length
  }
  $.ajax({
    url: 'http://localhost:3000/digital-board/api/1.0/text',
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(position),
    success: function (response) {
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("digital-board-logic.js: error: ", xhr.statusText)
    }
  })
}