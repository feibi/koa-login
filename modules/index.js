const mongoose = require('mongoose');

import {db} from '../config/dev.config'
import User from './user'

mongoose.connect(db.url);

module.exports = {
    User
}
