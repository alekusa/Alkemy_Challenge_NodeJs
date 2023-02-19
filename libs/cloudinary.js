import { v2 as cloudinary } from 'cloudinary'
import { cloud_name, api_key, api_secret } from '../config/config.js'
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
})

export const uploadImg = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'apiAlkemy'
    })
}

export const deleteImg = async (id) => {
    return await cloudinary.uploader.destroy(id)
}
