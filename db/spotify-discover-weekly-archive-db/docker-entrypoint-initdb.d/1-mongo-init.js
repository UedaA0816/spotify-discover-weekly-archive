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
  
db.createCollection('auto_archive_history');

db.auto_archive_history.createIndex(
  {
    userId:1,
    createdAt:1
  }
)

