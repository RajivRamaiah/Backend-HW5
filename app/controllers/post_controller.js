//  Sources: http://mongoosejs.com/docs/2.7.x/docs/finding-documents.html
//  http://stackoverflow.com/questions/14199529/mongoose-find-modify-save

import Post from '../models/post_model';

const cleanAllPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

const cleanOnePost = (post) => {
  return { id: post._id, title: post.title, tags: post.tags, content: post.content };
};

export const createPost = (req, res) => {
  // res.send('post should be created here');
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find()
    .then(posts => {
      res.json(cleanAllPosts(posts));
    })
    .catch(error => {
      res.json({ error });
    });
};


export const getPost = (req, res) => {
  Post.findById({ _id: req.params.id })
    .then(post => {
      res.json(cleanOnePost(post));
    })
    .catch(error => {
      res.json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
    .then(() => {
      res.json('Post successfully deleted!');
    })
    .catch(error => {
      res.json({ error });
    });
};

export const updatePost = (req, res) => {
  Post.update({ _id: req.params.id }, {
    title: req.body.title,
    tags: req.body.tags,
    content: req.body.content,
  }).then(() => {
    res.send('Successfully updated post!');
  })
  .catch(error => {
    res.json({ error });
  });
};
