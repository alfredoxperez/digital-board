const socket = io();

socket.on('connect', () => {
  $.ajax({
    url: 'http://localhost:3000/digital-board/api/1.0/text',
    contentType: 'application/json',
    type: 'GET',
    data: '',
    success: function (data) {
      data.forEach(d => 
        $('#digital-board').val(d + '\n' + $('#digital-board').val()))
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("digital-board-logic.js: error: ", xhr.statusText)
    }
  })
})

socket.on('outboundDigitalboardSocket', data => 
  $('#digital-board').val(data + '\n' + $('#digital-board').val()))


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