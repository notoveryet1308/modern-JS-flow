 import axios from 'axios';

 class Search {
   constructor(query) {
     this.query = query;

   }
   async getResuts() {

     try {
       const proxy = 'https://cors-anywhere.herokuapp.com/'
       const res = await axios(`${proxy}https://recipesapi.herokuapp.com/api/search?q=${this.query}`);
      this.recipes = res.data.recipes;
     } catch {
       alert('Somethig went wrong !!!')
     }
   }

 }

 export default Search;