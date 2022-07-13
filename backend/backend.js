const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser');
const { signup, signout, signin } = require("./firebase2")
const admin = require('firebase-admin');
const { getStorage, ref, getDownloadURL} = require("firebase/storage");
const storage = getStorage();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getSheets } = require("./sheets")


const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.use(bodyParser.json());
app.use(cors())

app.post('/materials', async (req, res) => {
  const materialsRef = db.collection('materials');
  const snapshot = await materialsRef.get();
  let materials_pack = snapshot.docs
  let materials = []

  for (let i = 0; i < materials_pack.length; i++) {
    let url = null
    // console.log( materials_pack[i].data().pic)
    try {
      url = await getDownloadURL(ref(storage, materials_pack[i].data().pic))
      // console.log(url)
    } catch (error) {
      url = "resources/default_image.png"
    }
    let material = {
      id: materials_pack[i].id,
      type: materials_pack[i].data().type,
      info: materials_pack[i].data().info,
      image: url
    }
    materials.push(material)
  }
  res.send(materials)
})

app.post('/patterns', async (req, res) => {
  const patternsRef = db.collection('patterns');
  const snapshot = await patternsRef.get();
  let patterns_pack = snapshot.docs
  let patterns = []
  for (let i = 0; i < patterns_pack.length; i++) {
    let url = null
    try {
      url = await getDownloadURL(ref(storage, patterns_pack[i].data().pic))
    } catch (error) {
      url = "resources/default_image.png"
    }
    let pattern = {
      id: patterns_pack[i].id,
      type: patterns_pack[i].data().name,
      info: patterns_pack[i].data().print,
      image: url
    }
    patterns.push(pattern)
  }
  res.send(patterns)
})

app.post('/borders', async (req, res) => {
  const bordersRef = db.collection('borders');
  const snapshot = await bordersRef.get();
  let borders_pack = snapshot.docs
  let borders = []
  for (let i = 0; i < borders_pack.length; i++) {
    let url = null
    try {
      url = await getDownloadURL(ref(storage, borders_pack[i].data().pic))
    } catch (error) {
      url = "resources/default_image.png"
    }
    let border = {
      id: borders_pack[i].id,
      type: borders_pack[i].data().name,
      info: borders_pack[i].data().info,
      image: url
    }
    borders.push(border)
  }
  res.send(borders)
})

app.post('/submit', async (req, res) => {
  // console.log(req.body.user, req.body.selected);
  let promise = await getSheets({"material" : req.body.selected[0], "pattern" : req.body.selected[1], "color" : req.body.selected[2], "border" : req.body.selected[3], "user" : req.body.user})
  let sheet = await promise
  console.log(sheet);
  res.send({ message: true });
})

app.post('/login', async (req, res) => {
  signout()
  let certified = await signin(req.body.id, req.body.password)
  let a = certified;
  res.send(a);
})

app.post('/signup', async (req, res) => {
  let certified = await signup(req.body.id, req.body.password)
  let a = await certified;
  console.log(a)
  res.send({ message: a });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})