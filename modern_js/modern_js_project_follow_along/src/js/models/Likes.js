export default class Likes {
    constructor(){
        this.likes = [];
    }
    
    addLike(id, title, author, image) {
        const like = { id, title, author, img};
        this.likes.push(like);
        
        //persist data in localStorage
        this.persistData();
        
        return like;
    }
    
    deleteLike(id){
        const index = this.likes.findIndex(current => current.id === id);
        this.likes.splice(index, 1); 
        
        //persist data in localStorage
        this.persistData();
    }
    
    isLiked(id){
        return this.likes.findIndex(element => element.id === id) !== -1;
    }
    
    getNumLikes() {
        return this.likes.length;
    }
    
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    
    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        //restoring likes from the localStorage
        if(storage) this.likes = storage;
        
    }
}