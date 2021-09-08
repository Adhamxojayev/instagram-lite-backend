import express from 'express'

const router = express.Router()

import loginValidation from '../controller/loginValidation.js'

router.route('/login')
    .post(loginValidation)


export default router