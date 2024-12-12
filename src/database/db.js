const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();
 
const pool = new Pool({
  user: process.env.PGUSER,
  password:process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false 
  }
})

const connectDB = async () =>{
    try{
        const result = await pool.query("SELECT * FROM test");
        console.log(result.rows)
        console.log("Postgres connected successfully")
    }
    catch(error){
        console.log("Some error occured connecting to Postgres")
    }
    
} 



module.exports = {connectDB,pool}