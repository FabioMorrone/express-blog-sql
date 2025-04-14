const connection = require('../data/db')
const lista = require('../data/lista');


function index(req, res) {
    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });


}






function show(req, res) {


    const postId = Number(req.params.id);

    const sql = 'SELECT * FROM posts WHERE id = ?'

    const sqlJoin = 'SELECT tags.* FROM post_tag JOIN tags ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?'


    connection.query(sql, [postId], (err, postResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResults.length === 0) return res.status(404).json({ error: 'Post not found' });

        const post = postResults[0];

        connection.query(sqlJoin, [postId], (err, postResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            console.log(postResults);
            post.tag = postResults


            res.json(post);
        });
    });
}





function store(req, res) {

    const newSlug = lista[lista.length - 1].slug + 1;

    const newPost = {

        title: req.body.title,
        slug: newSlug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }

    lista.push(newPost)

    console.log(lista);

    res.status(201);
    res.json(newPost);



    // res.send('store a new posts');
}

function update(req, res) {
    const postSlug = Number(req.params.Slug);


    const post = lista.find(post => post.slug === postSlug);
    console.log(post);

    if (!post) {

        return res.status(404).json({
            error: '404 not found',
            message: 'post not found'
        });
    }

    console.log(req.body);

    post.title = req.body.title,
        post.slug = req.body.slug,
        post.content = req.body.content;
    post.image = req.body.image,
        post.tags = req.body.tags,

        console.log(lista);

    res.json(post);
    // res.send(`update the posts with an id of ${req.params.id}`);
}

function modify(req, res) {
    res.send(`modify the posts with an id of ${req.params.id}`);
}


const destroy = (req, res) => {
    const postId = Number(req.params.id);
    const sql = 'DELETE FROM posts WHERE id = ?'

    connection.query(sql, [postId], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    })


}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
};