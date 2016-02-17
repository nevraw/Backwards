(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
//  console.log('Cancel');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for background color choice
var $invertValue;
$("input[name=invert]").change(function () {
 $invertValue = parseInt(this.value);
});

// Radio control for seconds displaying choice
var $secondsValue;
$("input[name=seconds]").change(function () {
 $secondsValue = parseInt(this.value);
});

function loadOptions() {
 if (localStorage.invert) {
  $invertValue = localStorage.invert;
  console.log('localStorage.invert: ' + $invertValue);
 } else {
  $invertValue = 0;
  console.log('localStorage.invert was undefined, now set to: ' + $invertValue);
 }
 $("input[name=invert][value='" + $invertValue + "']").attr('checked', 'checked');
} 

 if (localStorage.seconds) {
  $secondsValue = localStorage.seconds;
  console.log('localStorage.seconds: ' + $secondsValue);
 } else {
  $secondsValue = 1;
  console.log('localStorage.seconds was undefined, now set to: ' + $secondsValue);
 }
 $("input[name=seconds][value='" + $secondsValue + "']").attr('checked', 'checked');
} 

function getAndStoreConfigData() {
 var options = {
  invert:   $invertValue,
  seconds:  $secondsValue
 };
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.invert = $invertValue;
 localStorage.seconds = $secondsValue;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
