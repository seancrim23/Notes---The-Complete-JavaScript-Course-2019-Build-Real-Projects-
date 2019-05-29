import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

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
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        //highlight selected search item
        if (state.search) searchView.highlightSelected(id);
        
        //create a new recipe object
        state.recipe = new Recipe(id);
        
        try{
            //get the recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
        
            //calculate time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();
        
            //render the recipe to the UI
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
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

//handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    if(event.target.matches('.btn-decrease, .btn-decrease *')){
        // decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(event.target.matches('.btn-increase, .btn-increase *')){
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(event.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //add ingredients to shopping list
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        //like controller
        controlLike();
    }
});

window.l = new List();
/*
    SHOPPING LIST CONTROLLER
*/
const controlList = () => {
    //create a new list if there is none yet
    if(!state.list){
        state.list = new List();
    }
    
    //add each ingredient to the list
    state.recipe.ingredients.forEach(current => {
        const item = state.list.addItem(current.count, current.unit, current.ingredient);
        listView.renderItem(item);
    }); 
};

//handle delete and update list item events
elements.shopping.addEventListener('click', event => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    //handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // delete from state
        state.list.deleteItem(id);
        
        //delete from UI
        listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

/*
    LIKE CONTROLLER
*/  

const controlLike = () => {
    //create new likes object if it doesnt already
    if(!state.likes) state.likes = new Likes();
    
    const currentId = state.recipe.id;
    
    //user has not yet liked current recipe
    if(!state.likes.isLiked(currentId)){
        //add like to the state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //toggle the like button
        likesView.toggleLikeBtn(true);
        
        //add like to the ui list
        likesView.renderLike(newLike);
    //user HAS liked the current recipe
    }else{
        //remove like from the state
        state.likes.deleteLike(currentId);
        //toggle the like button
        likesView.toggleLikeBtn(false);
        
        //remove like from the ui list
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    //restore likes
    state.likes.readStorage();
    
    //toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    
    //render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});