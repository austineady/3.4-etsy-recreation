/*
You will need to use the following function
to fetch data from Etsy's API. You call the
function with the API URL as well as a callback
function that will receive the response.
*/

var url = "https://api.etsy.com/v2/listings/active.js?api_key=kz94tq0fg2i6mkj1gk0g2glg&keywords=skyrim&includes=Images,Shop";
fetchJSONP(url, currentArrayItem);

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function currentArrayItem(data) {
  for(var i = 0; i < data.results.length; i++) {
    var item = data.results[i];
    changeVariables(item);
    console.log(data);
}
}

function changeVariables(item) {
  var image = item.Images[0].url_170x135;
  var title = String(item.title);
  var seller = item.Shop.login_name;
  var price = item.price;
  var context = {inputimage: image, inputtitle: title, inputseller: seller, inputprice: price};
  logResults(context);
}

function logResults(context) {
  var source = document.querySelector("#result-template").innerHTML;
  var template = Handlebars.compile(source);
  var output = template(context);
  var templateHtml = template({});
  var findDiv = document.querySelector('.middlecontainer');
  findDiv.insertAdjacentHTML("beforeend", output);
}

/*Then you can call the function like this,
where you would replace logResults with the
name of the function you want to be called
with the results.
*/
