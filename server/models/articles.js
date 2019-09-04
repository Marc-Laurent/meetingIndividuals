const mongoose = require('mongoose')

allowedArticleTypes = [] //Type article

const articleTypeValidator = type => {
    return (types.indexOf(type) !== -1)
}

const article = new mongoose.Schema({
    was_new: { type: Boolean, default: false },
    reference: { type: String, lowercase: true, trim: true },
    label: String,
    description: String,
    body: String,
    contact: String,
    url_google_map: String,
    pictures: [String],
    Sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, default: allowedArticleTypes[0], validate: articleTypeValidator },
    created_on: Date,
    updated_on: Date,
    started_on: Date,
    ended_on: Date
})

article.static({
    getAllowContentTypeList: () => allowedArticleTypes
})

article.method({})


article.pre('save', next => {
    this.was_new = this.isNew

    if(this.was_new && !this.reference) this.reference = String(this._id)

    this.updated_on = new Date
    next()
})

article.post('save', article => {})

article.post('remove', article  => {})

module.exports = mongoose.model('Article', article)
