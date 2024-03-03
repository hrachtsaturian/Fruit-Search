const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// filtering the list of searching fruits
function filterFruitsList(inputText) {
  return fruit.filter((element) => {
    return element.toLowerCase().includes(inputText.toLowerCase());
  });
}

function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

// function to make our matching letters bolder
function hightlightLetters(suggestedFruit, inputText) {
  const inputTextLower = inputText.toLowerCase();
  const unboldSectionsArray = suggestedFruit.toLowerCase().split(inputTextLower);

  const sections = unboldSectionsArray.map((el, index) => {
    if (!el && index === 0) {
      return `<b>${capitalize(inputTextLower)}</b>`;
    }
    if (index === 0) {
      return `${capitalize(el)}<b>${inputTextLower}</b>`;
    }
    if (index === unboldSectionsArray.length - 1) {
      return el;
    }
    return `${el}<b>${inputTextLower}</b>`;
  });
  
  return sections.join('');
}

/* 
create search bar
read from search bar
filter fruit array given the search input
display filtered fruit array ->
*/

function createSuggestionItem(suggestedFruit, inputText) {

  const li = document.createElement('li');
  li.innerHTML = hightlightLetters(suggestedFruit, inputText);
  li.style.cursor = 'pointer'; 
  
  li.addEventListener('click', () => {
    input.value = suggestedFruit;
    suggestions.style.display = 'none';
  });
  return li;
}

function showSuggestions(filteredList, inputText) {
  // if no input
  // or input only contains spaces
  // or if no suggestions found for given input
  // then clear suggestions (if any)
  if (!inputText || !inputText.trim() || filteredList.length === 0) {
    suggestions.style.display = "none";
    return;
  };

  suggestions.style.display = "block"; // make visible
  suggestions.innerHTML = null; // clear the suggestions div

  for (let i = 0; i < filteredList.length; i++) {
    const suggestion = createSuggestionItem(filteredList[i], inputText);
    suggestions.appendChild(suggestion);
  } 
}

function searchHandler(event) {
  const inputText = event.target.value; // a, ap, app, appl, apple
  const filteredList = filterFruitsList(inputText);
  showSuggestions(filteredList, inputText);
}

input.addEventListener('keyup', searchHandler);
