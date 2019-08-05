$(function(){
$( "#submitInfo" ).submit(function( event ) {
    event.preventDefault();
    var num = $('#phoneNum').val();
    var message = $('#messageSent').val();
    $.post("/client", 
    { 
      number: num, 
      message: message
    }, function(result){
          $("span").html(result);
      });
  });

  const socket = io();
  socket.on('smsStatus', function(data){
    if(data.error){
      response.innerHTML = '<h5>Text message sent to ' + data.error + '</h5>';
    }else{
      response.innerHTML = '<h5>Text message sent to ' + data.number + '</h5>';
    }
  });

})
