import express from 'express';
import PORT from './config.js';
import file_upload from './lib/FILE_upload.js'
import avatar_image from './lib/avatar_image.js'
import { POST_POSTS, FILE_posts } from './modules/POSTPosts.js'
import { FILE_put } from './modules/PUTPost.js'
import { POST_avatar } from './modules/POST_avatar.js'
import { FILE_delete } from './modules/DELETE_post.js'
import { FILE_delete_avatar } from './modules/DELETE_avatar.js'
import { POST_follow, DELETE_follow } from './modules/POST_DELETE_follow.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import register from './auth/register.js'
import login from './auth/login.js'
import users from './users/users.js'
import comment from './comment/comment.js'
import likes from './likes/likes.js'
import saved from './saved/saved.js'

const app = express()

app.use(cookieParser())
app.use( express.json() )
app.use( express.static( path.join( process.cwd(), 'src', 'upload_posts' ) ) )

app.use(register)
app.use(login)
app.use(users)
app.use(comment)
app.use(likes)
app.use(saved)

app.post( '/posts', file_upload().single('post'),POST_POSTS)
app.post( '/post_title', FILE_posts )
app.put( '/post_title', FILE_put )
app.delete( '/post', FILE_delete) 
app.post( '/follow', POST_follow)
app.delete( '/follow', DELETE_follow)

app.post( '/avatar', avatar_image().single('image') ,POST_avatar)
app.delete( '/avatar', FILE_delete_avatar)

app.listen( PORT, () => console.log('http://localhost:'+PORT ) )
