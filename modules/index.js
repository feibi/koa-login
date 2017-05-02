const mongoose = require('mongoose');

import {db} from '../config/dev.config'
import User from './user'
let dbConnection = mongoose.connection;

mongoose.connect(db.url);
dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open',function(){
  console.log('mongo has been connected success')
})

module.exports = {
  User
}
