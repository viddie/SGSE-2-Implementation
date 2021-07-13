const { json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/ratings");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

//tokensecret zum Verschlüssen
const accessTokenSecret = "somerandomaccesstoken";

//Authentifizierung des JWT-token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    //Entschlüsselung durch tokensecret und Weitergabe User-Informationen
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      //return user als req-Parameter
      req.validUser = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//Überprüfungsschnittstelle Ausagbae aller User
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Abfrage einer Userbewertung über userid
router.get("/UserID/:id", getUser, (req, res) => {
  res.json(res.tokenuser);
});

//Anlegen oder updaten einer Userbewertung
router.post(
  "/UserID/:id/Rating/:star_num",
  authenticateJWT,
  getUser,
  async (req, res) => {
    //Funktion für die Berechnung der durschnittlichen Userbewertung
    let average = (array) => array.reduce((a, b) => a + b) / array.length;

    try {
      try {
        //Untersuchen, ob User schon vorhanden
        doubleRating = await User.findOne({
          ID: req.params.id,
          RaterIDs: req.validUser.id,
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      //Sofern die Bewertung schon aufgetreten
      if (doubleRating != null) {

        //Zuordnung BewertungsID und Bewertung über die Arrays und ändern der Bewertung
        index = res.user.RaterIDs.indexOf(req.validUser.id);
        tmp = res.user.MappedRatings;
        tmp[index] = Number(req.params.star_num);

        //Anlegen eines neuen Eintrages 
        const newUser = new User({
          ID: doubleRating.ID,
          RaterIDs: doubleRating.RaterIDs,
          MappedRatings: tmp,
          avgStar: average(tmp),
          totalRatings: doubleRating.totalRatings,
        });

        //Neuer Eintrag und alten löschen
        updatedUser = await newUser.save();
        await doubleRating.remove();

        //Rückgabe aktualiserte Bewertung
        res.json(updatedUser);
      } else {
        try {

          //Aktualisieren der Bewertungsparameter
          res.user.RaterIDs.push(req.validUser.id);
          res.user.MappedRatings.push(req.params.star_num);
          res.user.avgStar = average(res.user.MappedRatings);
          res.user.totalRatings = res.user.totalRatings + 1;

          //Aktualisierte Bewertung speichern
          const updatedUser = await res.user.save();

           //Rückgabe aktualiserte Bewertung
          res.json(updatedUser);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

//Löschen eines Bewertungseintrages
router.delete("/:id", authenticateJWT, getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Finden eines Bewertungseintrages oder erstellen eines nicht vorhandenen
async function getUser(req, res, next) {
  try {
    user = await User.findOne({ ID: req.params.id });

    //falls Benutzer nicht gefunden werden kann
    if (user == null) {
      //Erstellen eines neunen Nutzers
      const newUser = new User({
        ID: req.params.id,
      });
      try {
        //Speichern eines neuen Bewertungseintrages
        user = await newUser.save();
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
