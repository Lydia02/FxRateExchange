const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
     password: {
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required:true,
        unique: true
    },
    
});

UserSchema.pre(
    'save',
    async function(next) {
        // const user = his;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next()
    }
)
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare
}
 

const User = mongoose.model('user', UserSchema);

module.exports = User;
