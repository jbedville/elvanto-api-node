const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const USERS = [{
    email: 'jason@emergechurch.com.au',
    password: 'test'
}]

router.post('/login', (req, res) => {
    const {email, password} = req.body
    const user = USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn: '1d',})
    res.json({ token })
})

module.exports = router