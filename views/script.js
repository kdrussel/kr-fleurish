var URL = 'http://localhost:3000';

$(document).ready(function () {
  // Init sidenav
  $('.button-collapse').sideNav();      
});

// Create events
$('#createEvent').click(function(){
  var createEvent = {
    "title": $('#newEventTitle').val(),
    "website": $('#newEventWebsite').val(),
    "location": $('#newEventLocation').val(),
    "description": $('#newEventDes').val(),
  }

  $.post(URL+'/create-Event', createEvent, function(err,response){
    createEvent;
    $('#newEventTitle').val() == $('#newEventTitle').val("");
    $('#newEventWebsite').val() == $('#newEventWebsite').val("");
    $('#newEventLocation').val() == $('#newEventLocation').val("");
    $('#newEventDes').val() == $('#newEventDes').val("");
  })
    $('.alert').toggle();    
});

// Get all events from DB
$.get(URL+'/all-event', function(data){
    var el ="";
    for( i = 0; i < data.length; i++){
    el+="<div class='panel panel-default'><div class='panel-heading'><h2 class='eventList panel-title'>"+data[i].title+"</h2></div><div class='panel-body'><p>"+data[i].description+"</p><p>"+data[i].street+"<br>"+data[i].city+", "+data[i].state+" "+data[i].zip+"</p><p>"+data[i].startDate+" - "+data[i].endDate+"</p><p>"+data[i].startTime+" to "+data[i].endTime+"</p><p>Age Restriction: "+data[i].ageRestriction+"</p><p>"+data[i].website+"</p><p>Admission Price: $"+data[i].admission+"</p><p>Fleurs: "+data[i].fleur+"</p></div><div class='panel-footer'><p><span class='label label-default'>"+data[i].type[0]+"</span> <span class='label label-default'>"+data[i].type[1]+"</span> <span class='label label-default'>"+data[i].type[2]+"</span> <span class='label label-default'>"+data[i].type[3]+"</span> <span class='label label-default'>"+data[i].type[4]+"</span> <span class='label label-default'>"+data[i].type[5]+"</span> <span class='label label-default'>"+data[i].type[6]+"</span> <span class='label label-default'>"+data[i].type[7]+"</span></p></div></div>";   
      // trying to figure out how to hide the undefined type of event tags
      for(a = 0; a < 7; a++){
        if(data[i].type[a] === undefined){
          $('span').addClass('hiddenTag');
        }
      }
    }  
    $('#eventList').append(el);
});