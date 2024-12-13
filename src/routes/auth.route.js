const express = require('express');
const {loginUser,registerUser} = require('../controllers/auth.controller')

const router = express.Router();


/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: "User registration"
 *     description: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               username: 
 *                 type: string
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Registered successfully.
 *       400:
 *         description: Username or Email already exists
 *       500:
 *         description: Failed to register
 * /api/auth/login:
 *   post:
 *     summary: "User sign in"
 *     description: Login registered users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               username: 
 *                 type: string
 *               password:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Login successfull.
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed
 *              
 */

router.post('/login',loginUser);

router.post('/register',registerUser);

module.exports = router;