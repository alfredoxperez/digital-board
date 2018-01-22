const socket = io();

socket.on('connect', () => {
  $.ajax({
    url: 'http://localhost:3000/digital-board/api/1.0/text',
    contentType: 'application/json',
    type: 'GET',
    data: '',
    success: function (data) {
      data.forEach(d => 
        $('#digital-board').prepend('<option>' + d + '</option>'))
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("digital-board-logic.js: error: ", xhr.statusText)
    }
  })
})

socket.on('outboundDigitalboardSocket', data => 
  $('#digital-board').prepend('<option>' + data + '</option>'))


// function checkEnter() {
//   $('#new-text-input').keyup(function(event) {
//     console.log("FOO")
//     if(event.keyCode === 13) {
//       $('#new-text-submit-button').click()
//     }
//   })
// }
function checkEnter(e){ //e is event object passed from function invocation
  let characterCode //literal character code will be stored in this variable
  
  if(e && e.which){ //if which property of event object is supported (NN4)
    e = e
    characterCode = e.which //character code is contained in NN4's which property
  } else {
    e = event
    characterCode = e.keyCode //character code is contained in IE's keyCode property
  }
  
  if(characterCode == 13){ //if generated character code is equal to ascii 13 (if enter key)
    $('#new-text-submit-button').click()
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