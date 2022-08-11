/* exported data */
var data = {
  view: 'home-page',
  search: null,
  searchedEntries: [],
  savedEntries: [],
  nextEntryId: 1
};

var savedItems = localStorage.getItem('saved-food-items');
if (savedItems !== null) {
  data = JSON.parse(savedItems);
}

function addToLocalStorage(event) {
  var dataValues = JSON.stringify(data);
  localStorage.setItem('saved-food-items', dataValues);
}
window.addEventListener('beforeunload', addToLocalStorage);
