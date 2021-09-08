import fs from 'fs'
import path from 'path'
import { userJoi } from '../controller/validation.js'

const putUser = (req,res) => {
    try {
        let data = userJoi.validate(req.body)
        let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
        users = users ? JSON.parse(users) : []
        let user = users.find(user => user.userId == data.value.userId)
        if(user){
            if(data.value.username) user.username = data.value.username
            if(data.value.fullname) user.fullname = data.value.fullname
            fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(users,null,4))
            res.status(202).json({status: 202, message: 'Accepted'})
        }else{
            res.status(501).json({status:501, message: 'Not Implemented'})
        }
    } catch (err) {
        res.status(401).json({status: 401, message: err})
    }
}

const deleteUser = (req,res) => {
    try{
        let data = req.body
        let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
        users = users ? JSON.parse(users) : []
        let user = users.findIndex(user => user.userId == data.userId)
        if(req.cookies.userId == user.userId){
            if(user > -1){
                users.splice(user,1)
            }
            fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(users,null,4))
            res.status(200).json({status: 204, message: 'user deleted'})
        }
        else{
            res.status(401).json({status: 401, message: "you can't do that"})
        }    
    }catch(err){
        res.status(401).json({status:401, message: err})
    }
}




export {
    putUser,
    deleteUser
}