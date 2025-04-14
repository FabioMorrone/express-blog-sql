const lista = require('../data/lista');

function index(req, res) {

    let filteredlista = lista;

    console.log(req);

    if (req.query.tags) {
        console.log('filter the result');
        filteredlista = lista.filter(post => post.tags.includes(req.query.tags));
    }
    //  res.send('return all posts here');
    res.json(filteredlista);
}




function show(req, res) {
    const postSlug = req.params.slug;

    const post = lista.find(post => post.slug === postSlug);

    if (!post) {
        return res.status(404).json({
            error: '404 not found',
            message: 'post not found'
        });
    }

    res.json(post);
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
    const postSlug = Number(req.params.slug);


    const post = lista.find(post => post.slug === postSlug);
    console.log(post);

    if (!post) {

        return res.status(404).json({
            error: '404 not found',
            message: 'post not found'
        });
    }


    lista.splice(lista.indexOf(post), 1);
    console.log(lista);

    res.sendStatus(204)

}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
};