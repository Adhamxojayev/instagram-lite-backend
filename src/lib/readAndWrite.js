import fs from 'fs'
import path from 'path'

function read(jsonName) {
	try {	
		if(!jsonName) throw  new Error('Json file name required')
		let file = fs.readFileSync( path.join( process.cwd(), 'src' , 'database' , jsonName + '.json' ) , 'UTF-8')
		return  file ? JSON.parse(file) : []
	} catch(e) {
		console.log(e);
	}
}

function write( fileName , data ) {
	try {
		if(!fileName) throw new Error('Json file name required')
		if(!data) throw new Error('data required')
		fs.writeFileSync( path.join( process.cwd(), 'src' , 'database' , fileName + '.json' ), JSON.stringify(data , null , 4) )
	} catch(e) {
		console.log(e);
	}
}

export {
	read,
	write
}