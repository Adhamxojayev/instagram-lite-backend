import express from 'express'

const router = express.Router()

import registerValidation from '../controller/registerValidation.js'

router.route('/register')
    .post(registerValidation)


export default router