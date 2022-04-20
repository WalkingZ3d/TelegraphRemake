const db = require('../dbConfig/init');

module.exports = class Post{
    
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.name = data.name;
        this.story = data.story;
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {        
                let postData = await db.query('SELECT * FROM posts;');               
                let posts = postData.rows.map(b => new Post(b));
                resolve (posts);
            } catch (err) {
                reject('Post not found');                
            }
        });
    };

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`SELECT *
                                                    FROM posts 
                                                    WHERE books.id = $1;`, [ id ]);
                let post = new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('post not found');
                console.log(err);
            }
        });
    };

    static async create(postData){
        return new Promise (async (resolve, reject) => {
            try {
                const {title, name, story} = postData;
                let result = await db.query(`INSERT INTO posts (title, name, story) VALUES ($1, $2, $3) RETURNING *;`, [title, name, story])
                resolve (result.rows[0]);
            } catch (err) {
                reject('Post could not be created');
            }
        });
    };
}