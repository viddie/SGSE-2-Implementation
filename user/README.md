# Einfügen der jwt-Validation
Vorher müsst ihr logischerweise noch das package.json anpassen für den npm install im Dockerfile
## Imports
```js
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
```
## Unser Tokensecret
```js
const accessTokenSecret = 'somerandomaccesstoken';
```
## Middlewarefunktion
```js
//Vor den requests definieren

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.validUser = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
```

## Benutzung im Code 
```js
router.get('/', authenticateJWT, async (req,res) =>
{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err)
    {
        res.status(500).json({message: err.message})
    }
})
```

## Benutzung der Userinfos
```js
    const role = req.validUser.role; //siehe authenticateJWT
    const email = req.validUser.email;
    const id = req.validUser.id;
    const role = req.validUser.role;
//z.B
    if (role != 'admin') {
        return res.sendStatus(403);
    }
```