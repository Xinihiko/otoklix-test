const fs = require('fs');
let blog_datas = require("../../../data.json");

function saveData() {
    fs.writeFileSync("data.json", JSON.stringify(blog_datas, null, 4));
}

export default function handler(req, res){
    switch (req.method) {
        case "POST":
            const {title, content} = req.body; 
            const new_post = {
                id: blog_datas.length ? Math.max(...blog_datas.map(x => x.id)) + 1 : 1,
                title:title,
                content:content,
                published_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            blog_datas.push(new_post);
            saveData()

            res.status(200).json( new_post )
            break;
        default:
            res.status(200).json(blog_datas)
            break;
    }
}