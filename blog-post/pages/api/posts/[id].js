const fs = require('fs');
let blog_datas = require("../../../data.json");

function saveData() {
    fs.writeFileSync("data.json", JSON.stringify(blog_datas, null, 4));
}

export default function handler(req, res){
    let id = req.query['id'];
    const blog_post = blog_datas.find(x => x.id.toString() === id.toString());
    let {title, content} = req.body;
    switch (req.method) {
        case "PUT":
            if (blog_post) {
                blog_post.title = title;
                blog_post.content = content;
                blog_post.updated_at = new Date().toISOString();
                saveData();
                res.status(200).json(blog_post);
            } else {
                res.status(404).json({ message: `Blog with id ${ id } does not exist.` })
            }
            
            break;
        case "DELETE":
            if (blog_post) {
                blog_datas = blog_datas.filter(x => x.id.toString() !== id.toString());
                saveData();
                res.status(200).json(blog_post);
            } else {
                res.status(404).json({ message: `Blog with id ${ id } does not exist.` })
            }
            
            break;
        default:
            if (blog_post) {
                res.status(200).json(blog_post);
            } else {
                res.status(404).json({ message: `Blog with id ${ id } does not exist.` })
            }
            break;
    }
}