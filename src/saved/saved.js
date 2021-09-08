import express from 'express'

const router = express.Router()

import {saved} from './controller.js'

router.route('/saved')
    .post(saved)



export default router