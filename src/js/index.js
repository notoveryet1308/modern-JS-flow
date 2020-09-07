import Search from './models/Search';
import Recipe from './models/Recipe';

import * as searchView from './views/searchView';
import {
  elements,
  renderLoader,
  clearLoader
}
from './views/base';

const state = {}

/**
 * - Search Controller
 */

const controlSearch = async () => {
  const query = searchView.getInput();
  console.log(`QUERY: ${query}`)
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.resultBox);
    await state.search.getResuts();
    clearLoader();
    searchView.renderResult(state.search.recipes);
  }
}
elements.formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.paginationBox.addEventListener('click', e => {
  e.preventDefault();
  const btn = e.target.closest('.page-btn');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResult(state.search.recipes, goToPage)
  }
})


/**
 * - Recipe Controller
 */

const recipeController = async () => {
  const id = window.location.hash.replace('#', '');
  console.log(id);
  if (id) {
    state.recipe = new Recipe(id)
    await state.recipe.getRecipe();
    console.log(state.recipe);
    state.recipe.parseIngredients();
  }
}

['hashchange', 'load'].forEach(el => window.addEventListener(el, recipeController));