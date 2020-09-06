import Search from './models/Search';
import * as searchView from './views/searchView';
import {
  elements,
  renderLoader,
  clearLoader
}
from './views/base';

const state = {}

const controlSearch = async () => {
  const query = searchView.getInput();
  console.log(`QUERY: ${query}`)
  if (query) {
    state.search = new Search(query);
    // 3.) prepare UI for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.resultBox);
    await state.search.getResuts();

    // render rresult on UI
    // console.log('AFTER-FETCH')
    // console.log(state.search.recipes);
    clearLoader();
    searchView.renderResult(state.search.recipes);

  }
}
elements.formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.paginationBox.addEventListener('click', e=>{
  e.preventDefault();
  const btn = e.target.closest('.page-btn');
  if(btn){
    const goToPage = parseInt(btn.dataset.goto , 10);
    searchView.clearResults();
    searchView.renderResult(state.search.recipes, goToPage)

  }

})