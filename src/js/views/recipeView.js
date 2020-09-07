import {elements} from './base';

const renderOtherDetail = ingredient =>{
 return `
     <p>${ingredient.count} ${ingredient.unit} ${ingredient.ingredient}</p>
   `
}

export const renderRecipe = recipe => {
  const markUp = `
    <div class="img-box" 
        style="background-image: url(${recipe.image_url})">
         <h1 class="title">${recipe.title}</h1>
    </div>
    <div class="other-details other-detail_list">
         ${recipe.ingredients.map(el => renderOtherDetail(el)).join("")}
    </div>
  `
  elements.menuDetailBox.insertAdjacentHTML("beforeend", markUp);
}


