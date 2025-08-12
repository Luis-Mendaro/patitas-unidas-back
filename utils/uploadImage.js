const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const fs = require("fs");

async function uploadImage(file, bucketName) {
    const { error } = await supabase.storage
        .from(bucketName)
        .upload(file.newFilename, fs.createReadStream(file.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: file.mimetype,
            duplex: "half",
        });

    if (error) throw new Error(`Error uploading image ${error}`);
    return file.newFilename;
}

module.exports = { uploadImage }