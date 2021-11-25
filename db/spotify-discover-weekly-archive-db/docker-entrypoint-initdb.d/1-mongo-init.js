db = db.getSiblingDB('spotify');

db.createUser(
  {
    user: "spotifyApp",
    pwd:"!spotifyApp",
    roles:[
       {role:"readWrite",  db:"spotify"},
    ]
  }
)


db.createCollection('auto_archive');

db.auto_archive.createIndex(
  {
    userId:1
  },
  {
    unique:true
  }
)

db.auto_archive.insertMany([
  {
    userId:"wetti0816",
    enabled:null,
  },
  {
    userId:"test1",
    enabled:true,
  },
])
