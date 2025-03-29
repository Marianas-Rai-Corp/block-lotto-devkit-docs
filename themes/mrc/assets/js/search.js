'use strict';

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "json/search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "bookSearchConfig" | default "{}" }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';
  const indexConfig = Object.assign({{ $searchConfig }}, {
  includeScore: true,
  useExtendedSearch: true,
  fieldNormWeight: 1.5,
  threshold: 0.2,
  ignoreLocation: true,
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'content',
      weight: 0.3
    }
  ]
});

const input = document.querySelector('#book-search-input');
const results = document.querySelector('#book-search-results');

if (!input) {
  return
}

input.addEventListener('focus', init);
input.addEventListener('keyup', search);

document.addEventListener('keypress', focusSearchFieldOnKeyPress);

/**
 * @param {Event} event
 */
function focusSearchFieldOnKeyPress(event) {
  if (event.target.value !== undefined) {
    return;
  }

  if (input === document.activeElement) {
    return;
  }

  const characterPressed = String.fromCharCode(event.charCode);
  if (!isHotkey(characterPressed)) {
    return;
  }

  input.focus();
  event.preventDefault();
}

/**
 * @param {String} character
 * @returns {Boolean} 
 */
function isHotkey(character) {
  const dataHotkeys = input.getAttribute('data-hotkeys') || '';
  return dataHotkeys.indexOf(character) >= 0;
}

function init() {
  input.removeEventListener('focus', init); // init once
  input.required = true;

  fetch(searchDataURL)
    .then(pages => pages.json())
    .then(pages => {
      window.bookSearchIndex = new Fuse(pages, indexConfig);
    })
    .then(() => input.required = false)
    .then(search);
}

function search() {
  // Clear previous results
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }

  // If there's no input value, stop here
  if (!input.value) {
    return;
  }

  // Create a wrapper for the results
  const resultsWrapper = document.createElement('div');
  resultsWrapper.classList.add(
    'static', 
    'md:absolute', 
    'md:mt-4', 
    'md:mt-10', 
    'w-full', 
    'md:bg-base-200', 
    'text-base-content', 
    'md:rounded-box', 
    'top-px', 
    'max-h-[calc(100vh-8.6rem)]', 
    'w-56', 
    'overflow-y-auto', 
    'border', 
    'border-white/5', 
    'md:shadow-2xl', 
    'md:outline-1', 
    'md:outline-black/5'
  );

  const resultsMenu = document.createElement('ul');
  resultsMenu.classList.add('menu', 'menu-sm', 'w-full');
  resultsWrapper.appendChild(resultsMenu);
  results.appendChild(resultsWrapper);

  // Get the search results
  const searchHits = window.bookSearchIndex.search(input.value || inputModal.value).slice(0, 10);

  // If there are no results
  if (searchHits.length === 0) {
    const noResultsItem = document.createElement('li');
    const noResultsText = document.createElement('span');
    noResultsItem.classList.add('menu-disabled');
    noResultsText.classList.add('text-gray-500', 'p-2');
    noResultsText.textContent = 'No results found';
    noResultsItem.appendChild(noResultsText);
    resultsMenu.appendChild(noResultsItem);
  } else {
    // If there are results, display them
    searchHits.forEach(function (page) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const span = document.createElement('span');
      const small = document.createElement('small');

      a.href = page.item.href;
      span.textContent = page.item.title;
      small.textContent = page.item.section;

      a.classList.add('flex', 'flex-col', 'items-start', 'gap-0.5');
      small.classList.add('text-gray-500');

      a.appendChild(span);
      a.appendChild(small);
      li.appendChild(a);

      resultsMenu.appendChild(li);
    });
  }
}

/**
 * @param {String} content
 * @returns {Node}
 */
function element(content) {
  const div = document.createElement('div');
  div.innerHTML = content;
  return div.firstChild;
}
}) ();
