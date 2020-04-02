// express para criar o servidor
const express =  require("express");
const server = express();

const db = require("./db");


//configurando arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitando uso do req.body
server.use(express.urlencoded({ extended: true }))

//configurando o nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
    
});

//criar uma rota e captura a req do usuario para responder
server.get("/", (req, res) => {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados");
        }

        const reversedIdeas = [...rows].reverse()
        
        let lastIdeas = []
        for(let idea of reversedIdeas) {
            if(lastIdeas.length < 3) {
                lastIdeas.push(idea)
            }
        } 
    
        return res.render("index.html", { ideas: lastIdeas });
    })

});

server.get("/ideias", (req, res) => {
  
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados");
        }

        const reversedIdeas = [...rows].reverse()
    
        return res.render("ideias.html", { ideas: reversedIdeas}); 
    })

});

server.post("/", (req, res) => {
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados");
        }

        return res.redirect("/ideias")
    });
});


//ligando o servidor na porta 3000
server.listen(3000);
