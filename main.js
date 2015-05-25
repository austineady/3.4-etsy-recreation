/*
You will need to use the following function
to fetch data from Etsy's API. You call the
function with the API URL as well as a callback
function that will receive the response.
*/
var userInput = document.getElementById('userinput').value;
var url = "https://api.etsy.com/v2/listings/active.js?api_key=kz94tq0fg2i6mkj1gk0g2glg&keywords=skyrim&includes=Images,Shop";
fetchJSONP(url, currentArrayItem);
var combinedArrays = [];

function clickSearch(event) {
  var userInput = document.getElementById('userinput').value;
  url = "https://api.etsy.com/v2/listings/active.js?api_key=kz94tq0fg2i6mkj1gk0g2glg&keywords="+userInput+"&includes=Images,Shop";
  fetchJSONP(url, currentArrayItem);
  changeCategory(userInput);
}

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
document.querySelector('.listings').innerHTML = "";
document.querySelector('.categorylist').innerHTML = "";
  for(var i = 0; i < data.results.length; i++) {
    var item = data.results[i];
    var category = data.results[i].category_path;
    changeVariables(item);
    combineArrays(category);
}
}

function determineCategories(array) {
  combinedArrays.forEach(function(value, index) {
    combinedArrays.shift();
  })
}

function combineArrays(category) {
  category.forEach(function(value, index) {
    if (combinedArrays.indexOf(value) === -1) {
      combinedArrays.push(value);
      changeCategory(value);
    }
  })
}

function sortByFrequencyAndRemoveDuplicates(category) {
  var frequency = {}, value;

  for(var i = 0; i < category.length; i++) {
    value = category[i];
    if(value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  var uniques = [];
  for(value in frequency) {
    uniques.push(value);
  }

  function compareFrequency(a, b) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
  console.log(sortByFrequencyAndRemoveDuplicates(category));
}


function changeVariables(item) {
  var image = item.Images[0].url_170x135;
  var title = String(item.title);
  var seller = item.Shop.login_name;
  var price = item.price;
  var itemsite = item.url;
  var sellersite = item.Shop.url;
  var context = {
    inputimage: image,
    inputtitle: title,
    inputseller: seller,
    inputprice: price,
    inputitemsite: itemsite,
    inputsite: sellersite
  };
  logResults(context);
}

function changeCategory(value, userInput) {
  var categoryValue = {categoryname: value, userinputword: userInput};
  displayCategories(categoryValue);
}

function logResults(context) {
  var source = document.querySelector("#result-template").innerHTML;
  var template = Handlebars.compile(source);
  var output = template(context);
  var templateHtml = template({});
  var findDiv = document.querySelector('.listings');
  findDiv.insertAdjacentHTML("beforeend", output);
}

function displayCategories(categoryValue) {
  var source = document.querySelector("#category-template").innerHTML;
  var template = Handlebars.compile(source);
  var output = template(categoryValue);
  var findDisplayLi = document.querySelector('.categorylist');
  findDisplayLi.insertAdjacentHTML("beforeend", output);
}

document.querySelector('.searchbutton').addEventListener('click', clickSearch);


/*Then you can call the function like this,
where you would replace logResults with the
name of the function you want to be called
with the results.
*/
