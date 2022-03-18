const pg = require('pg')
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const client = new pg.Client({
  connectionString: 'postgres://gzinafdz:l6E9pDuoWrWJ127aAZI6pOEmGRD9b1Oc@surus.db.elephantsql.com/gzinafdz'
});

client.connect()
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
  }
] 
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  })
  if (user) {
    const accessToken = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secretkey')
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    })
  } else {
    res.status(401).json("username or password incorrect!")
  } 
}) 
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("token is not valid!")
      }
      req.user = user;
      next(); 
    })
  } else {
    res.status(401).json("you are not access")

  }
}
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})
//Connection port
app.listen(5000, () => {
  console.log("working on port 5000")
})
//LİSTELEME
app.get("/api/user", async (req, res) => {
  const list = "select * from kullanicidata order by id";
  const getir = await client.query(list)
  res.json(getir.rows)
}) 
//EKLEME
app.post('/api/user', async (req, res) => {

  const name = req.body.name
  const surname= req.body.surname
  const phone = parseInt(req.body.phone)
  const date =req.body.date
  const mail=req.body.mail
  console.log(name,surname,phone,date,mail)
  const sql = `INSERT INTO kullanicidata(ad,soyad,pnumber,dtarih,eposta) VALUES ('$1','$2',$3,${req.body.date},'$4') RETURNING * ;`
    const response = await client.query(sql,[name,surname,phone,mail])
    res.json([response.rows]) 
 }); 
//Hepsini Silme 
app.delete("/api/user", async (req, res) => {
  const del = "delete from kullanicidata";
  const deleter = await client.query(del)
  res.json(deleter)
})
// Güncelleme 
app.put("/api/user/:id/", async (req, res) => {
  const a = parseInt(req.body.b)
  console.log(req.body.surname, "idholder")
  const update = `update kullanicidata set ad = '${req.body.name}',soyad= '${req.body.surname}', pnumber=${a},eposta='${req.body.mail}' where id = ${req.params.id}`;
  console.log(update) 
  const updater = await client.query(update) 
  res.json(updater) 
})  
// Single Delete
app.delete("/api/user/:id/", async (req, res) => {
  const singledel = `delete from kullanicidata where id = ${req.params.id}`
  const singledeleter = await client.query(singledel)
  res.json(singledeleter)
}) 
  