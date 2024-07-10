import fs from "node:fs"
import fsp from "node:fs/promises"
import {LOCAL_PATH_UPLOAD_FILES,CLOUD_NAME,CLOUD_API_KEY,CLOUD_API_SECRET} from "../exports.js"
import { finished } from "node:stream/promises";
import {v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUD_API_KEY,
    api_secret:CLOUD_API_SECRET,
    secure:true
})

export let UploadImage=async(file)=>{
    const { createReadStream, filename, mimetype } = await file;
    let stream= createReadStream();
    let path=`${LOCAL_PATH_UPLOAD_FILES}${Date.now()}-${filename}` 
    const out = fs.createWriteStream(path);
    stream.pipe(out);
    await finished(out);
   try {
    let fileInfo= await cloudinary.uploader.upload(path,{
        resource_type: mimetype.split('/')[0]
        
    })
    let {public_id,secure_url,resource_type, width ,height ,format }=fileInfo
    return { public_id, url:secure_url, type:resource_type, width ,height ,format }
   } catch (error) {
      console.log(error.message);
   }finally{
    fsp.unlink(path)
   }
   
}   