import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'devverudd',
    api_key: '454899939774814',
    api_secret: 'OJ7k06cyuTeioWg4o90mKUGPATg'
})

export const uploadImg = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'apiAlkemy'
    })
}

export const deleteImg = async (id) => {
    return await cloudinary.uploader.destroy(id)
}
