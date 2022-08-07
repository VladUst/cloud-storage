const fs = require('fs');
const File = require('../models/File');
const config = require('config');

class FileService {
    createDir(file){
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`;
        return new Promise((resolve, reject) => {
            try{
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath);
                    return resolve({message: 'file created'});
                } else {
                    return reject({message: 'file already exists'});
                }
            } catch (err){
                return reject({message:"file error"});
            }
        })
    }
}

module.exports = new FileService()