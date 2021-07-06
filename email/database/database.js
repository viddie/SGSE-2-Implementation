const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

function create_db()
{
  db.all(create_query,[],insert_data_db)
}

function saveItem(an,von,inhalt,angebot_id)
{
    in_query = "INSERT INTO emails(an,von,inhalt,angebot_id) VALUES(" + an + ","+ von + "," + inhalt +"," + angebot_id + ")"
    db.all(in_query,[],(err,rows) => {
        if(err){
            throw err;
        }
    });
}

function insert_data_db()
{
  db.all(insert_query,[],test_db)
}
function test_db()
{
  db.all(test_query,[],(err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row);
    });
  });
}

function db_Query(sql_query,callback)
{
  db.all(sql_query, [], callback)
}

create_query = `CREATE TABLE IF NOT EXISTS emails (
  email_id INTEGER PRIMARY KEY AUTOINCREMENT,
  an text NOT NULL,
  von text NULL,
  inhalt text NULL,
  zeitstempel TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  angebot_id INTEGER NULL)`

insert_query = `INSERT INTO emails(an,von,inhalt,angebot_id)
  VALUES(2,1,"Danke für die Emails",6)`

test_query = `SELECT * FROM emails`

create_db()