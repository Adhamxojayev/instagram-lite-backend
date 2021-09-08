import fs from 'fs'
import path from 'path'


const postLike = (req,res) => {
    try {
        let data = req.body
        let likes = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'likes.json'), 'utf-8')
        likes = likes ? JSON.parse(likes) : []
        let userLike = likes.find(val => val.user_id == req.cookies.userId && val.is_like == true)
        let userNull = likes.find(val => val.user_id == req.cookies.userId && val.is_like == null)
        if(userLike) userLike.is_like = null
        else if(userNull) userNull.is_like = true
        else if(req.cookies.userId){
            let newLike = {
                user_id: req.cookies.userId,
                file_id: data.file_id,
                is_like: data.is_like
            }
            likes.push(newLike)
        }
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'likes.json'), JSON.stringify(likes,null,4))
        res.status(201).json({status: 201, message: 'like added'})
    } catch (err) {
        res.status(401).json({status: 401, message: err.message})
    }
}




export {
    postLike
}