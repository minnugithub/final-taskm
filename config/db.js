import mysql2 from "mysql2";
import { Sequelize} from "sequelize";
// MySQL Connection using Sequelize ORM Module ...
const connection = new Sequelize('intake', 'root', '', {
       host: 'localhost',
       dialect: 'mysql',
       pool: {
       max: 10,
       min: 0,
       acquire: 30000,
       idle: 10000
},

logging: console.log
})

connection.authenticate().then(() => {
console.log('Connection has been established successfully.');
}).catch((err) => {
console.log('Unable to connect to the database:', err.toString());
})
connection.sync();
export default connection;