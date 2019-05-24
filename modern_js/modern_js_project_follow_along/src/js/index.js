import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

/** Global state of the app
    - search object
    - current recipe object
    - shopping list object
    - liked recipes
*/
const state = {};

const controlSearch = async () => {
    // 1 - get query from view
    const query = searchView.getInput(); //TODO
    
    if(query){
        //2 - new search object and add it to the state
        state.search = new Search(query);
        
        //3 - prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        //4 - search for recipes
        await state.search.getResults();
        
        
        //5 - render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});