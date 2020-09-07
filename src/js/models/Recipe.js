import axios from 'axios';

class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const res = await axios(`${proxy}https://recipesapi.herokuapp.com/api/get?rId=${this.id}`);
      const {
        image_url,
        ingredients,
        publisher,
        title,
        source_url
      } = res.data.recipe;
      this.image_url = image_url;
      this.ingredients = ingredients;
      this.publisher = publisher;
      this.title = title;
      this.source_url = source_url;
    } catch {
      alert('Somethig went wrong !!!')
    }
  }

  caclCookingTime() {
    const numOfIng = this.ingredients.length;
    const periods = Math.ceil(numOfIng / 3);
    this.time = periods * 15;
  }

  calcServing() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitLong = [
      'tablespoons', 'tablespoon', 'ounces', 'ounce',
      'teaspoons', 'teaspoon', 'cups', 'pounds'
    ]
    const unitShort = [
      'tbsp', 'tbsp', 'oz', 'oz',
      'tsp', 'tsp', 'cup', 'pound'
    ]
    const newIngredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();
      unitLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2));
      let objIng;
      if (unitIndex > -1) {
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+'));
        } else {
          count = eval(arrCount.slice(0, unitIndex).join('+'))
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      } else if (parseInt(arrIng[0], 10)) {
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(" ")

        }
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    })
    this.ingredients = newIngredients;
  }
}

export default Recipe;



// _id: "5dd0f2b646d3bd53d2898f80"
// ​
// image_url: "https://res.cloudinary.com/dk4ocuiwa/image/upload/v1575163942/RecipesApi/pizza3464.jpg"
// ​
// ingredients: Array(9) [ "8 whole Small Russet Potatoes", "Canola Oil", "Butter, Melted", … ]
// ​
// publisher: "The Pioneer Woman"
// ​
// publisher_url: "http://thepioneerwoman.com"
// ​
// recipe_id: "6fab1c"
// ​
// social_rank: 99.99999999760887
// ​
// source_url: "http://thepioneerwoman.com/cooking/2013/04/pizza-potato-skins/"
// ​
// title: "Pizza Potato Skins"


// "8 whole small russet potatoes"
// ​​
// 1: "canola oil"
// ​​
// 2: "butter, melted"
// ​​
// 3: "kosher salt"
// ​​
// 4: "jarred marinara or pizza sauce"
// ​​
// 5: "grated mozzarella cheese"
// ​​
// 6: "diced pepperoni"
// ​​
// 7: "minced fresh parsley"
// ​​
// 8: "miscellaneous pizza toppings: cooked sausage, cooked hamburger, diced bell pepper, diced onion, diced mushrooms, diced canadian bacon, etc."