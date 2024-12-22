const http = require('http')
const fs = require('fs')
const path = require('path');



const port = 3000;

const server = http.createServer((req,res)=>{
   const filePath =  path.join(__dirname, req.url === '/' ? "index.html" : req.url)
   console.log(filePath);
   const extName = String( path.extname(filePath)).toLowerCase()

   const mimeTypes={ //multipurpose internet mail extensions
'.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'text/png',
   }

  const contentType = mimeTypes[extName] || 'application/octet-stream'

  fs.readFile(filePath, (err, content)=>{
    if(err){
        //Error No ENtry
        if(err.code === 'ENOENT'){
            res.writeHead(404, {'Content-Type':'text/html'})
            res.end("404:file not found bro!")
        }


    }else{
        res.writeHead(200,{'Content-Type':contentType})
      res.end(content, "utf-8");

    }

  })
   
})



server.listen(port, ()=>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`)
})