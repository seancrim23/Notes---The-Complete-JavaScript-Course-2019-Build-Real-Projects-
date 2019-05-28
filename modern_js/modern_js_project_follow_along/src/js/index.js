import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
/** Global state of the app
    - search object
    - current recipe object
    - shopping list object
    - liked recipes
*/
const state = {};

/*
    SEARCH CONTROLLER
*/
const controlSearch = async () => {
    // 1 - get query from view
    const query = searchView.getInput(); //TODO
    
    if(query){
        //2 - new search object and add it to the state
        state.search = new Search(query);
        
        try{
            //3 - prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);
        
            //4 - search for recipes
            await state.search.getResults();
        
        
            //5 - render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(err){
            console.log('Something wrong with the search!');
            console.log(err);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.clearResButtons();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*
    RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    //get id from the URL
    const id = window.location.hash.replace('#', '');
    //console.log(id);
    
    if(id){
        //prepare the UI for changes
        
        //create a new recipe object
        state.recipe = new Recipe(id);
        
        try{
            //get the recipe data
            await state.recipe.getRecipe();
        
            //calculate time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();
        
            //render the recipe to the UI
            console.log(state.recipe);
        }catch(err){
            console.log('error processing recipe!');
            console.log(err);
        }
    }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
//change to the below for less lines of code
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));