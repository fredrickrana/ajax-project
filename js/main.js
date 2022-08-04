var $title = document.querySelector('.title');
var $searchBar = document.querySelector('.search-bar');
var $searchButton = document.querySelector('.search-button');
var $searchResults = document.querySelector('div[data-view = "searched-results"]');
var $imageBackground = document.querySelector('.image-background');
var $silverBackground = document.querySelector('.silver-background');
var $blackBackground = document.querySelector('.black-background');
var $searchDescription = document.querySelector('.search-description');
var $ul = document.querySelector('#searched-results');
var $applicationImages = ['images/iPhoneHomepage.png', 'images/iPhoneSalmon.png', 'images/iPhoneSpaghetti.png'];
var $device = document.querySelector('.application-image');
setInterval(carousel, 5000);

function goToHomePage(event) {
  data.view = 'home-page';
  viewSwap();
}
$title.addEventListener('click', goToHomePage);

function viewSwap() {
  if (data.view === 'home-page') {
    $imageBackground.className = 'container image-background';
    $silverBackground.className = 'container silver-background';
    $blackBackground.className = 'container black-background';
  } else if (data.view === 'searched-results') {
    $silverBackground.className = 'hidden';
    $blackBackground.className = 'hidden';
    $searchResults.className = 'container';
  }
}

function carousel() {
  var $currentImage = $applicationImages.length - 1;
  for (var i = 0; i < $applicationImages.length; i++) {
    if ($device.getAttribute('src') === $applicationImages[$currentImage]) {
      $device.setAttribute('src', $applicationImages[i]);
      return;
    } else if ($device.getAttribute('src') === $applicationImages[i]) {
      $device.setAttribute('src', $applicationImages[i + 1]);
      return;
    }
  }
}

function search(event) {
  event.preventDefault();
  var $foodSearch = $searchBar.value;
  if ($foodSearch === '') {
    return;
  }
  resetSearch();
  apiSearch($foodSearch);
  $searchBar.value = '';
  $searchDescription.textContent = 'Search results for ' + '"' + $foodSearch + '"';
  data.view = 'searched-results';
  viewSwap();
}
$searchButton.addEventListener('click', search);

function resetSearch() {
  var $li = document.querySelectorAll('li');
  for (var i = 0; i < $li.length; i++) {
    if ($li.length !== 0) {
      $ul.removeChild($li[i]);
    }
  }
}

function apiSearch(foodSearch) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  var originalUrl = 'https://api.edamam.com/api/food-database/v2/parser?app_id=3bb26765&app_key=2b1cec07263a9c58acf5631de5d1be8f&ingr=';
  originalUrl += foodSearch;

  xhr.addEventListener('load', function () {
    var $results = xhr.response.hints;
    for (var i = 0; i < $results.length; i++) {
      var $foodName = $results[i].food.label;
      var $imageOfFood = $results[i].food.image;
      var $imageSubstitute = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Gz22F4NcRxJNwsNyqzzU_aWXvAAmZtWbuw&usqp=CAU';
      var $calories = Math.floor($results[i].food.nutrients.ENERC_KCAL) + ' grams';
      var $protein = Math.floor($results[i].food.nutrients.PROCNT) + ' grams';
      var $fat = Math.floor($results[i].food.nutrients.FAT) + ' grams';
      var $carbohydrate = Math.floor($results[i].food.nutrients.CHOCDF) + ' grams';
      var $liElement = document.createElement('li');
      $liElement.setAttribute('class', 'style-none');
      var $divOne = document.createElement('div');
      $divOne.setAttribute('class', 'food-card');
      $liElement.appendChild($divOne);
      var $hTwoOne = document.createElement('h2');
      $hTwoOne.textContent = $foodName;
      $divOne.appendChild($hTwoOne);
      var $imgElementOne = document.createElement('img');
      if ($imageOfFood !== undefined) {
        $imgElementOne.setAttribute('src', $imageOfFood);
      } else {
        $imgElementOne.setAttribute('src', $imageSubstitute);
      }
      $imgElementOne.setAttribute('class', 'searched-image');
      $divOne.appendChild($imgElementOne);
      var $pElementOne = document.createElement('p');
      $pElementOne.textContent = 'Per Serving - 100 grams';
      $divOne.appendChild($pElementOne);
      var $hThreeOne = document.createElement('h3');
      $hThreeOne.textContent = $calories + ' Calories';
      $divOne.appendChild($hThreeOne);
      var $pElementTwo = document.createElement('p');
      $pElementTwo.textContent = 'Protein: ' + $protein;
      $divOne.appendChild($pElementTwo);
      var $pElementThree = document.createElement('p');
      $pElementThree.textContent = 'Fat: ' + $fat;
      $divOne.appendChild($pElementThree);
      var $pElementFour = document.createElement('p');
      $pElementFour.textContent = 'Carbohydrate: ' + $carbohydrate;
      $divOne.appendChild($pElementFour);
      $ul.appendChild($liElement);
    }
  });
  xhr.open('GET', originalUrl);
  xhr.send();
}
