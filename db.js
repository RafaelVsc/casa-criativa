const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./casa-criativa.db')

db.serialize(function () {
    //criando tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    //inserindo dados na tabela
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES(?,?,?,?,?);
    // `
    // const values = [
    //     "https://image.flaticon.com/icons/svg/364/364170.svg",
    //     "Cursos CSS Grid Layout Completo",
    //     "Estudo",
    //     "Esse é um curso feito para o site, isso significa que é longo e detalhado. Ele não foi feito para o YouTube, onde geralmente o conteúdo é mais curto. Todas as propriedades funcionam da mesma forma apesar do curso ter sido feito em 2017. Apenas a propriedade grid-gap possui agora nome de gap apenas.",
    //     "https://youtu.be/hKXOVD2Yrj8"
    // ]

    // db.run(query, values, function(err) {
    //     if (err) return console.log(err)

    //     console.log(this)
    // })
    
    //deletando dado na tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
    //     if (err) return console.log(err)

    //     console.log("DELETED", this)
    // })

    //consultando dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })

});

module.exports = db