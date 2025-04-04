import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const app = express();
require('dotenv').config()

//! LOGIN 

const jwtSecret = process.env.JWT_SECRET

const users = []

app.post('api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10)
    users.push({ email, password: hashed})
    res.send({ message: 'User Registered'})
})

app.post('api/login', async (req, res) => {
    const { email, password } = req.body;
    const user.find(u => u.email === email);
    if (!user) return res.status(401).send({ error:'User not found' })

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send({ error:"Invalid password" })

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' })
    res.send({token})
})



