import fs from 'fs'
import path from 'path'


const saved = (req,res) => {
    try {
        let data = req.body
        let posts = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'posts.json'), 'utf-8')
        posts = posts ? JSON.parse(posts) : []
        let saveFile =  posts.find(val => val.file_id == data.file_id)
        let saved = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'saved.json'), 'utf-8')
        saved = saved ? JSON.parse(saved) : []
        let newSaveFile = saved.find(val => val.file_id == saveFile.file_id)
        if(newSaveFile){
            throw new Error('you did the job')
        }else{
            saved.push(saveFile)
        }
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'saved.json'), JSON.stringify(saved,null,4))
        res.status(201).json({status:201, message: 'save file'})
    }catch(err) {
        res.status(401).json({status:401, message: err.message})
    }
}

export {
    saved
}