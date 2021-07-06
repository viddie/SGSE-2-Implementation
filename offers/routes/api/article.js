const router = require('express').Router();
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const auth = require('../../interservice/auth')

var ArticleModel = mongoose.model('Article');

const upload = multer({ dest: "uploads" });

router.get('/article/findByCategory', function (req, res, next) {
    // Die Angabe der zulässigen Kategorien erfolgt per Query Parameter mit komma getrennt
    let categories = req.query.categories.split(',');
    categories = categories.map(e => e.trim());
    // Ausgabe der gefundenen Artikel
    ArticleModel.find({category : categories}, (err, articles) => {
        if (err) {
            return console.error(err);
        } else {
            idList = articles.map(element => element._id)
            res.status(200).json(idList);
        }
    });
});

router.get('/article/findByTags', function (req, res, next) {
    // Suche nach Tags
    let tags = req.query.tags.split(',');
    tags = tags.map(e => e.trim().toLowerCase());
    // Ausgabe der gefundenen Artikel
    ArticleModel.find({tags : tags}, (err, articles) => {
        if (err) {
            return console.error(err);
        } else {
            idList = articles.map(element => element._id)
            res.status(200).json(idList);
        }
    });
});

router.get('/article/:id', function (req, res, next) {
    // Ausgabe des gefundenen Artikel
    ArticleModel.find({_id : id}, (err, article) => {
        if (err) {
            return console.error(err);
        } else {
            res.status(200).json(article[0]);
        }
    });
});

// Ändere einen Artikel
router.put('/article', upload.any(), function (req, res) {
    // Es muss überprüft werden, ob der Nutzer zur Änderung berechtigt ist, also Inhaber des Angebotes ist
    // userID wird aus dem Token extrahiert
    let sellerID = 2332;

    auth.checkUserAuthorization(sellerID, "w").then((res) =>{
        if (res){
            // Überprüfe, ob die zu ändernde articleID existiert
            const articleID = req.body.articleID;
            if (articleID) {
                ArticleModel.find({_id : articleID}, (err, articles) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        // Überprüfe, ob das Angebot gefunden wurde und die sellerID dem User entspricht
                        if (articles[0].sellerID == userID){
                            const article = articles[0];
                            // Überprüfe bzw. Überarbeite die notwendigen Eingabefelder
                            article.heading = req.body.heading;
                            article.description = req.body.description;
                            article.category = req.body.category;
                            article.price = parseFloat(req.body.price).toFixed(2);
                            article.save(function (err) {
                                if (err) return console.error(err);
                                return res.status(200).json('Alles jut')
                            });
                        } else {
                            return res.status(400).json('Angebot existiert nicht!')
                        }
                    }
                });
            }
        } else {
            return res.status(400).json('Ungültige Eingabeparameter!')
        }
    })
})

// Lösche einen Artikel
router.delete('/article', upload.any(), function (req, res) {
    // Es muss überprüft werden, ob der Nutzer zur Änderung berechtigt ist, also Inhaber des Angebotes ist
    // userID wird aus dem Token extrahiert
    let userID = 2332;

    auth.checkUserAuthorization(userID, "w").then((res) =>{
        if (res){
            // Überprüfe, ob die zu ändernde articleID existiert
            const articleID = req.body.articleID;
            if (articleID) {
                ArticleModel.find({_id : articleID}, (err, articles) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        // Überprüfe, ob das Angebot gefunden wurde und die sellerID dem User entspricht
                        if (articles[0].sellerID == userID){
                            ArticleModel.deleteOne({_id : articleID}, (err)=> {
                                if (err) return handleError(err);
                            })
                        } else {
                            return res.status(400).json('Angebot existiert nicht!')
                        }
                    }
                });
            }
        } else {
            return res.status(400).json('Ungültige Eingabeparameter!')
        }
    })
})

// Erstelle einen neuen Artikel
router.post('/article', upload.any(), function (req, res) {
    
    // Die articleId ist die ID die die MongoDb als ID nach Einfügen führt

    // TODO
    // Überprüfe das Token, enthält auch die UserID
    let sellerID = 2332;
    auth.checkUserAuthorization(sellerID, "w").then((res) =>{
        if (res){
            // Überprüfe bzw. Überarbeite die notwendigen Eingabefelder
            let heading = req.body.heading;
            let description = req.body.description;
            let category = req.body.category;
            let price = parseFloat(req.body.price).toFixed(2);
            // Nur wenn die Pflichtfelder belegt sind wird der Artikel angelegt
            if (heading && description && category && price) {
                // Start und Enddatum
                let startDate = new Date().getTime();
                let endDate = startDate + 7*24*60*60*1000;
                const article = new ArticleModel({
                    sellerID: sellerID,
                    heading: heading,
                    description: description,
                    category: category,
                    price: price,
                    startedOn : startDate.toString(),
                    endsOn : endDate.toString()
                });

                // Falls Tags vorhanden sind werden diese hinzugefügt
                if (req.body.tags){
                    tagsString = req.body.tags;
                    tagsArray = tagsString.split(',');
                    article.tags = tagsArray.map(el => el.trim().toLowerCase());
                };
                base64images = []
                
                for (let i=0; i<req.files.length; i++){
                    // Bild soll kleiner als 4 MB sein
                    file = req.files[i]
                    if (file.size < 4000000){
                        const imageBase64 = "data:"+file.mimetype+";base64,"+fs.readFileSync(file.path, 'base64');
                        base64images.push(imageBase64)
                    }
                    // Lösche alle zwischengespeicherten Elemente
                    fs.unlinkSync(file.path)
                }

                article.pictures = base64images;
                article.save(function (err) {
                    if (err) return console.error(err);
                });

            } else {
                return res.status(400).json('Ungültige Eingabeparameter!')
            }
        } else {
            return res.status(400).json('Ungültige Eingabeparameter!')
        }
    });
});

module.exports = router;