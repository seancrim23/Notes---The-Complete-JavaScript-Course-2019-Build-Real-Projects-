import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }
    
    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error){
            console.log(error);
        }
    }
    
    calcTime(){
        //assuming we need 15 min for each 3 ingreds
        const numImg = this.ingredients.length;
        const periods = Math.ceil(numImg / 3);
        this.time = periods * 15;
    }
    
    calcServings(){
        this.servings = 4;
    }
    
    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(current => {
            //uniform units
            let ingredient = current.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            
            //remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
            
            //parse ingredients into count, unit, and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(cur => units.includes(cur));
            
            let ingObj;
            if(unitIndex > -1){
                //there is a unit
                //4 1/2 cups, arrCount is [4, 1/2]
                //ex 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(unitIndex).join('+'));
                }
                
                ingObj = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
                
            } else if(parseInt(arrIng[0], 10)){
                //there is no element, but first element is number
                ingObj = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1){
                //there is no unit and no first position number
                ingObj = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            
            return ingObj;
        });
        this.ingredients = newIngredients;
    }
    
    updateServings(type) {
        //servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        
        //ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings); 
        });
        
        this.servings = newServings;
    }
};