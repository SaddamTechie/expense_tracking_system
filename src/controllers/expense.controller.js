const {pool} = require('../database/db')

const getAllExpense =async (req,res) =>{
    try {
        const result = await pool.query("SELECT * FROM expenses");
        return res.status(200).json({"expenses":result.rows})
    } catch (error) {
        return res.status(500).json({"message":"Error fetching expenses",error})
    }
}

const addExpense = (req,res) =>{
    try {
        const {category,description,amount,date} = req.body;
        const result = pool.query("INSERT INTO expenses (category,description,amount,date) VALUES ($1,$2,$3,$4)",[category,description,amount,date]);
        return res.status(200).json({"message":"Data added successfully"})
    } catch (error) {
        return res.status(500).json({"message":"Failed to record"})
    }

}


const updateExpense = async (req,res) =>{
    try{
        const {id} = req.params;
        const idExist = await pool.query("SELECT * FROM expenses WHERE id=$1",[id])
        if(idExist.rows.length===0){
            return res.status(404).json({"message":"No expense by that id"})
        }
        const {category,description,amount,date} = req.body;
        
        /**
         * The COALESCE function checks if the provided value is NULL.
         *  If it is not NULL, it uses that value; otherwise, it uses the existing value from the database.
         */
        const query = `
        UPDATE expenses 
        SET 
            category = COALESCE($1, category),
            description = COALESCE($2, description),
            amount = COALESCE($3, amount),
            date = COALESCE($4, date)
        WHERE id = $5
    `;
        const values = [category,description,amount,date,id];
        const updateQuery = await pool.query(query,values);
        if(updateQuery.rowCount === 0){
            return res.status(400).json({"message":"Failed to update expense"})
        }
        return res.status(200).json({"id":id,"message":"Expense updated successfully"});
    }
    catch(error){
        console.error("Error updating expense",error);
        return res.status({"message":"Failed to update expense"})
    }
}


const deleteExpense = async (req,res) =>{
    try {
        const {id} = req.params;
        const idExist = await pool.query("SELECT * FROM expenses WHERE id=$1",[id])
        if(idExist.rows.length===0){
            return res.status(404).json({"message":"No expense by that id"})
        }
        const deleteQuery = await pool.query("DELETE FROM expenses WHERE id=$1",[id]);
        if(deleteQuery.rowCount===0){
            return res.status(400).json({"message":"Failed to delete expense"});
        }
        return res.status(200).json({"message":"Deleted successfully"})
    } catch (error) {
        console.error("Error deleting expense",error);
        return res.status(500).json({"message":"Failed to delete"});
    }
}

module.exports = {
    getAllExpense,
    addExpense,
    updateExpense,
    deleteExpense
}