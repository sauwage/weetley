var $  = require('jquery');
var weatherJson = require('./weather-icons.json');
$(function() {
  $('button[name="add-town"]').click(function() {
    var town = $('input[name="town"]').val();
    var interval = $('select[name="interval"]').val();
    if(town === "") {
      alert('Please, enter a valid town');
      return false;
    }
    addTile(town, interval);
    $('input[name="town"]').val("");
    return false;
  });
  $(document).on('click','button[name="remove-town"]', function() {
    $(this).closest('.tile-town').remove();
    return false;
  });

  var addTile = function(town, interval) {
    var $tileFactory = $('.template').clone().removeClass('template').attr('rel',town);
    $('h1', $tileFactory).text(town);
    $('.tiles').append($tileFactory);
    refreshTile(town);
    setInterval(function(){refreshTile(town);},interval*1e3);
  };

  var refreshTile = function(town) {
    var url = 'http://api.openweathermap.org/data/2.5/weather';
    $.ajax({
      url: url,
      data: {
        'q' : town,
        'units' : 'metric',
        'appid' : '8d37df734b83981d7ad5e4f21c004aa2'
      },
      success: function(response) {
        var $tile = $('.tile-town[rel="'+town+'"]');
        if(response.cod == 200) {
          $('h1', $tile).text(response.name);
          $('.degrees', $tile).html(response.main.temp.toFixed(1)+'&deg;C');
          $('#condition', $tile).text(response.weather[0].description);
          $('.speed', $tile).text(response.wind.speed+' m/s');
          $('.icon', $tile).html('<i class="'+translateIcon(response.weather[0].id)+'"></i>')
        } else {
          $('h1', $tile).text('Town not found');
          $('#wind', $tile).text('');
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
    var url = 'http://api.openweathermap.org/data/2.5/forecast';
    $.ajax({
      url: url,
      data: {
        'q' : town,
        'units' : 'metric',
        'appid' : '8d37df734b83981d7ad5e4f21c004aa2'
      },
      success: function(response) {
        var $tile = $('.tile-town[rel="'+town+'"]');
        if(response.cod == 200) {
          var tomorrow = response.list[8];
          var date = new Date(tomorrow.dt*1000);
          $('.date', $tile).text(date.toLocaleDateString());
          $('.temperature', $tile).html(tomorrow.main.temp.toFixed(1)+'&deg;C');
          $('.date', $tile).append('<i class="'+translateIcon(tomorrow.weather[0].id)+'"></i>');
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  };

  var translateIcon = function(id) {
    var prefix = 'wi wi-';
    var code = id;
    var icon = weatherJson[code].icon;
    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }
    // Finally tack on the prefix.
    icon = prefix + icon;
    return icon;
  };

  addTile('Berlin', 25);
  //addTile('Hamburg', 30);
  //addTile('Prague', 35);
});
