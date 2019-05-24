//the Search model
//e3286cba58436e357a8e006acd6df06e
//https://www.food2fork.com/api/search
import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
    
    async getResults(){
        const key = 'e3286cba58436e357a8e006acd6df06e';
        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }catch(error){
            alert(error);
        }
    }
}

