export const elements = {
  formElement: document.querySelector('.search-form'),
  searchInput : document.querySelector('.search-input'),
  resultList: document.querySelector('.result-list'),
  resultBox: document.querySelector('.search-result-box'),
  paginationBox: document.querySelector('.pagination-btns'),
};


export const renderLoader = (parent) =>{
   const loader = `
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
   `
   parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = ()=>{
   const loader = document.querySelector('.spinner');
   if(loader){
     loader.parentElement.removeChild(loader)
   }
}