//the Search view
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};

/*
string: 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / 5 + cur.length = 9/ newTitle = ['Pasta', 'with']
acc: 9 / 9 + cur.length = 15/ new Title = ['Pasta', 'with', 'tomato']
acc: 15 / 15 + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}; 

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#{recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};