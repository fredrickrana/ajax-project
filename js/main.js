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
var $clickHereButton = document.querySelector('.click-here-button');
var $foodInformation = document.querySelector('div[data-view = "food-information"]');
setInterval(carousel, 5000);

function goToHomePage(event) {
  resetSearch();
  data.view = 'home-page';
  viewSwap();
}
$title.addEventListener('click', goToHomePage);

function viewSwap() {
  if (data.view === 'home-page') {
    $imageBackground.className = 'container image-background';
    $silverBackground.className = 'container silver-background';
    $blackBackground.className = 'container black-background';
    $searchResults.className = 'hidden';
    $foodInformation.className = 'hidden';
  } else if (data.view === 'searched-results') {
    $searchResults.className = 'container';
    $silverBackground.className = 'hidden';
    $blackBackground.className = 'hidden';
    $foodInformation.className = 'hidden';
  } else if (data.view === 'food-information') {
    $foodInformation.className = 'container';
    $searchResults.className = 'hidden';
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
  data.search = $foodSearch;
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
      var $calories = Math.floor($results[i].food.nutrients.ENERC_KCAL);
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

// NUTRITION FACTS TABLE
var $foodDetailImage = document.querySelector('.food-detail-image');
var $amountPerServing = document.querySelector('#amount-per-serving');
var $calories = document.querySelector('#calories');
var $caloriesValue = document.querySelector('#calories-value');
var $dailyValue = document.querySelector('#daily-value');
var $totalFat = document.querySelector('#total-fat');
var $percentageTotalFat = document.querySelector('#percentage-total-fat');
var $saturatedFat = document.querySelector('#saturated-fat');
var $percentageSaturatedFat = document.querySelector('#percentage-saturated-fat');

var $transFat = document.querySelector('#trans-fat');

var $cholesterol = document.querySelector('#cholesterol');
var $percentageCholesterol = document.querySelector('#percentage-cholesterol');
var $sodium = document.querySelector('#sodium');
var $percentageSodium = document.querySelector('#percentage-sodium');
var $totalCarb = document.querySelector('#total-carbohydrate');
var $percentageTotalCarb = document.querySelector('#percentage-total-carb');
var $fiber = document.querySelector('#fiber');
var $percentageFiber = document.querySelector('#percentage-fiber');
var $totalSugar = document.querySelector('#total-sugar');

var $addedSugars = document.querySelector('#added-sugars');

var $protein = document.querySelector('#protein');
var $percentageProtein = document.querySelector('#percentage-protein');
var $vitaminD = document.querySelector('#vitaminD');
var $percentageVitaminD = document.querySelector('#percentage-vitamin-D');
var $calcium = document.querySelector('#calcium');
var $percentageCalcium = document.querySelector('#percentage-calcium');
var $iron = document.querySelector('#iron');
var $percentageIron = document.querySelector('#percentage-iron');
var $potassium = document.querySelector('#potassium');
var $percentagePotassium = document.querySelector('#percentage-potassium');
var $percentValues = document.querySelector('#percent-values');

var $unit = document.querySelector('#unit');
var $food = document.querySelector('#food');
var $energy = document.querySelector('#energy');
var $weight = document.querySelector('#weight');

function showNutritionLabel(event) {
  var $searchedImage = document.querySelector('.searched-image');
  var $imageURL = $searchedImage.getAttribute('src');
  data.view = 'food-information';
  viewSwap();
  resetSearch();
  $foodDetailImage.setAttribute('src', $imageURL);
  var foodSearch = data.search;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  var originalUrl = 'https://api.edamam.com/api/nutrition-data?app_id=3bb26765&app_key=2b1cec07263a9c58acf5631de5d1be8f&nutrition-type=logging&ingr=';
  originalUrl += foodSearch;

  xhr.addEventListener('load', function () {
    var $results = xhr.response;

    $amountPerServing.textContent = 'Amount Per Serving';

    $calories.textContent = 'Calories ';
    $caloriesValue.textContent = $results.calories;

    $dailyValue.textContent = '%Daily Value*';

    $totalFat.textContent = 'Total Fat ' + Math.round($results.totalNutrients.FAT.quantity * 10) / 10 + $results.totalNutrients.FAT.unit;
    $percentageTotalFat.textContent = Math.round($results.totalDaily.FAT.quantity) + '%';

    $saturatedFat.textContent = 'Saturated Fat ' + Math.round($results.totalNutrients.FASAT.quantity * 10) / 10 + $results.totalNutrients.FASAT.unit;
    $percentageSaturatedFat.textContent = Math.round($results.totalDaily.FASAT.quantity) + '%';

    $transFat.textContent = 'Trans Fat -';

    $cholesterol.textContent = 'Cholesterol ' + Math.round($results.totalNutrients.CHOLE.quantity * 10) / 10 + $results.totalNutrients.CHOLE.unit;
    $percentageCholesterol.textContent = Math.round($results.totalDaily.CHOLE.quantity) + '%';

    $sodium.textContent = 'Sodium ' + Math.round($results.totalNutrients.NA.quantity * 10) / 10 + $results.totalNutrients.NA.unit;
    $percentageSodium.textContent = Math.round($results.totalDaily.NA.quantity) + '%';

    $totalCarb.textContent = 'Total Carbohydrate ' + Math.round($results.totalNutrients.CHOCDF.quantity * 10) / 10 + $results.totalNutrients.CHOCDF.unit;
    $percentageTotalCarb.textContent = Math.round($results.totalDaily.CHOCDF.quantity) + '%';

    $fiber.textContent = 'Dietary Fiber ' + Math.round($results.totalNutrients.FIBTG.quantity * 10) / 10 + $results.totalNutrients.FIBTG.unit;
    $percentageFiber.textContent = Math.round($results.totalDaily.FIBTG.quantity) + '%';

    $totalSugar.textContent = 'Total Sugars ' + Math.round($results.totalNutrients.SUGAR.quantity * 10) / 10 + $results.totalNutrients.SUGAR.unit;

    $addedSugars.textContent = 'Includes - Added Sugars';

    $protein.textContent = 'Protein ' + Math.round($results.totalNutrients.PROCNT.quantity * 10) / 10 + $results.totalNutrients.PROCNT.unit;
    $percentageProtein.textContent = Math.round($results.totalDaily.PROCNT.quantity) + '%';

    $vitaminD.textContent = 'Vitamin D ' + Math.round($results.totalNutrients.VITD.quantity * 10) / 10 + $results.totalNutrients.VITD.unit;
    $percentageVitaminD.textContent = Math.round($results.totalDaily.VITD.quantity) + '%';

    $calcium.textContent = 'Calcium ' + Math.round($results.totalNutrients.CA.quantity * 10) / 10 + $results.totalNutrients.CA.unit;
    $percentageCalcium.textContent = Math.round($results.totalDaily.CA.quantity) + '%';

    $iron.textContent = 'Iron ' + Math.round($results.totalNutrients.FE.quantity * 10) / 10 + $results.totalNutrients.FE.unit;
    $percentageIron.textContent = Math.round($results.totalDaily.FE.quantity) + '%';

    $potassium.textContent = 'Potassium ' + Math.round($results.totalNutrients.K.quantity * 10) / 10 + $results.totalNutrients.K.unit;
    $percentagePotassium.textContent = Math.round($results.totalDaily.K.quantity) + '%';

    $percentValues.textContent = '* Percent Daily Values are based on a 2000 calorie diet';

    $unit.textContent = 'gram';
    $food.textContent = data.search;
    $energy.textContent = $results.calories + ' kcal';
    $weight.textContent = Math.round($results.totalWeight * 10) / 10 + ' g';

  });
  xhr.open('GET', originalUrl);
  xhr.send();

}
$clickHereButton.addEventListener('click', showNutritionLabel);
