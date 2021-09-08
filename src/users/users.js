import express from 'express'

const router = express.Router()

import {putUser} from './controller.js'
import {deleteUser} from './controller.js'

router.route('/users')
    .put(putUser)
    .delete(deleteUser)

export default router