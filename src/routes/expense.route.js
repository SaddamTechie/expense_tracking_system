const express = require('express');
const {getAllExpense,addExpense,updateExpense,deleteExpense} = require('../controllers/expense.controller')

const router = express.Router();

/**
 * @openapi
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of expenses.
 *     responses:
 *       200:
 *         description: Success, return all expenses.
 *       500:
 *         description: Failed to load expense data.
 *   post:
 *     summary: Add new expense
 *     security:
 *       - bearerAuth: []
 *     description: add new expense to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *             required:
 *               - category
 *               - amount
 *     responses:
 *       200:
 *         description: Added expense successfully.
 *       400:
 *         description: Invalid input data. 
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     security:
 *       - bearerAuth: []
 *     description: Update an existing expense by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the expense to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the expense.
 *               description:
 *                 type: string
 *                 description: A brief description of the expense.
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The updated amount of the expense.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the expense.
 *     responses:
 *       200:
 *         description: Updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Expense not found.
 *   delete:
 *     summary: Delete expense
 *     security:
 *       - bearerAuth: []
 *     description: Delete expense by id
 *     parameters: 
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of expense to be deleted.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully.
 *       404:
 *         description: No expense by that ID.
 *       400:
 *         description: Failed to delete.
 *       500:
 *         description: failed to delete,server error.
 */   
router.get('/',getAllExpense);

router.post('/',addExpense);

router.put('/:id',updateExpense);

router.delete('/:id',deleteExpense);

module.exports = router;