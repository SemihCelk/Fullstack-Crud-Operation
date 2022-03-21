const pg = require("pg");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const client = new pg.Client({
  connectionString:
    "postgres://gzinafdz:l6E9pDuoWrWJ127aAZI6pOEmGRD9b1Oc@surus.db.elephantsql.com/gzinafdz",
});
client.connect();
app.use(cors());
app.use(express.json());

//AUTH
const users = [
  {
    id: "1",
    username: "admin",
    password: "admin",
    isAdmin: true,
  },
  {
    id: "2",
    username: "user",
    password: "user",
    isAdmin: false,
  },
];
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    if (user.isAdmin) {
      const accessToken = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        "secretkey"
      );
      res.json({
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken,
      });
    } else {
      res.status(403).json("Forbidden Error");
    }
  } else {
    res.status(401).json("username or password incorrect!");
  }
});
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not access");
  }
};
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
//Connection port
app.listen(5000, () => {
  console.log("working on port 5000");
});
//LİSTELEME
app.get("/api/user", async (req, res,next) => {
  try{
    const list = "select * from kullanicidata order by id";
    const getir = await client.query(list);
    res.json(getir.rows);
  }
  catch(error){
    next(error)
  }
});
//EKLEME
app.post("/api/user", async (req, res,next) => {
  try{
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = parseInt(req.body.phone);
    const date = req.body.date;
    const mail = req.body.mail;
    console.log(name, surname, phone, date, mail);
    const sql = `INSERT INTO kullanicidata(ad,soyad,pnumber,dtarih,eposta) VALUES ($1,$2,$3,$4,$5) RETURNING * ;`;
    const response = await client.query(sql, [name, surname, phone, date, mail]);
    res.json([response.rows]);
  }
  catch(error){
    next(error)
  }
});
//Hepsini Silme
app.delete("/api/user", async (req, res) => {
  try{
    const del = "delete from kullanicidata";
    const deleter = await client.query(del);
    res.json(deleter);
  }
  catch(error){
    next(error)
  }
});
// Güncelleme
app.put("/api/user/:id/", async (req, res, next) => {
  try {
    const a = parseInt(req.body.b);
    const name = req.body.name;
    const surname = req.body.surname;
    const date = req.body.date;
    const mail = req.body.mail;
    const update = `
      update kullanicidata 
        set ad =$1,
        soyad= $2,
        pnumber=$3,
        dtarih=$4,
        eposta=$5
      where id = $6
      RETURNING *
    `;
    const response = await client.query(update, [name, surname, a, date, mail, req.params.id]);
    if(response.rows.length !== 1) {
      throw new Error('User not found')
    }
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});
// Single Delete
app.delete("/api/user/:id/", async (req, res,next) => {

try{
  const singledel = `delete from kullanicidata where id = $1`;
  const singledeleter = await client.query(singledel,[req.params.id]);
  res.json(singledeleter);
}
catch(error){
  next(error)
}
});
app.use((err, req, res, next) => {
  //console.error(err.stack);
  const message = err.message || 'Unknown Error';
  res.status(500).json({
    message,
    stack: err.stack
  });
});
