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

function loadOptions() {
 if (localStorage.invert) {
  $invertValue = localStorage.invert;
//  console.log('localStorage.invert: ' + $invertValue);
 } else {
  $invertValue = 0;
//  console.log('localStorage.invert was undefined, now set to: ' + $invertValue);
 }
 $("input[name=invert][value='" + $invertValue + "']").attr('checked', 'checked');
} 

function getAndStoreConfigData() {
// console.log('invert value: ' + $invertValue);

 var options = {
  invert:   $invertValue
 };
// console.log('Got options: ' + JSON.stringify(options));

 localStorage.invert = $invertValue;

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
