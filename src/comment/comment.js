import express from 'express'

const router = express.Router()

import {postComment} from './controller.js'
import {deleteCommmet} from './controller.js'

router.route('/comment')
    .post(postComment)
    .delete(deleteCommmet)



export default router