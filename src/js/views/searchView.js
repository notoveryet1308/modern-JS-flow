import {
  elements
} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
  elements.searchInput.value = '';
}
export const clearResults = () => {
  elements.resultList.innerHTML = '';
  elements.paginationBox.innerHTML= ''
}

const limitTilte = (title, limit = 25) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0)

    return `${newTitle.join(" ")}...`
  }

  return title;
}
const renderRecipe = recipe => {
  const markup = `
      <li>
          <a class="result__link" href="#${recipe.recipe_id}">
            <figure>
              <img src="${recipe.image_url}" alt="" />
            </figure>
            <div class="result__data">
              <h4 class="reslut__name">${limitTilte(recipe.title)}</h4>
              <p class="result__author">${recipe.publisher}</p>
            </div>
          </a>
        </li>
   `;

  elements.resultList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (page, type) => {
  if (type === "next") {
    return `
          <button class="page-btn btn-next" data-goto= ${page+1}>
            <span>
             page ${page + 1}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" 
              class="icon icon-tabler   icon-tabler-chevron-right" 
              width="22"
              height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none"   stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
            
          </button>
      `
  }
  if (type === "prev") {
    return `
        <button class="page-btn btn-prev" data-goto= ${page-1}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="22"
            height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="15 6 9 12 15 18" />
                   </svg>
          <span>
            page ${page - 1}
          </span>
        </button>
      `
  }
}

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, "next")
  } else if (page < pages) {
    button = `
      ${createButton(page, "prev")}
      ${createButton(page,"next")}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, "prev");
  }

  elements.paginationBox.insertAdjacentHTML("afterbegin", button);
}
export const renderResult = (recipes, page = 1, resPerPage = 5) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, 5);
}


