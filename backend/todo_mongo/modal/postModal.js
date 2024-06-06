const mongoose = require('mongoose');
const schema = mongoose.Schema(
    {
        task:'String',
        done:{
            type: Boolean,
            default: false
        }
    },
    {timestamps:true});

const Post = mongoose.model('Post', schema);
module.exports = Post;