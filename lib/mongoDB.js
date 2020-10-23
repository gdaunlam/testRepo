const {MongoClient, ObjectID} = require("mongodb");
const config = require("../config/index");

const USER = encodeURIComponent(config.DB_USER);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD);
const DB_NAME = encodeURIComponent(config.DB_NAME);
const DB_HOST = encodeURIComponent(config.DB_HOST);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

//variables no definidas afura ni con div son estaticas mongoLib.connection es una
class mongoLib{
  constructor(){
    this.client = new MongoClient(MONGO_URI,{userNewUrlPaser: true});
    this.dbName = DB_NAME;
  }
  //La idea es si la conexion o constante no existe la crea
  //crearla es poner en la constante una promesa dentro:
  //ejecuta metodo conecct de la bd a la que envia una funcion que bd lanza como log
  //este log deberia de ejecutarlo al final, donde si bd con error lo muestra, sino
  //resuelve con la creacion de la bd
  connect(){
    if(!mongoLib.connection){
      mongoLib.connection = new Promise((resolve,reject)=>{
        this.client.connect(err=>{
          if(err){
            reject(err);
          }
          console.log("La conexion fue agregada");
          resolve(this.client.db(this.dbName));
        })
      });
    }
    return mongoLib.connection;
  }

  getAll(collection,query){
    return this.connect().then(db=>{
      //find ES METODO DE MONGO
      return db.collection(collection).find(query).toArray();
    });
  }

  get(collection,id){
    return this.connect().then(db=>{
      //findOne ES METODO DE MONGO
      return db.collection(collection).findOne({_id:ObjectID(id)});
    });
  }

  create(collection,data){
    return this.connect().then(db=>{
      //insertOne ES METODO DE MONGO
      return db.collection(collection).insertOne(data);
    }).then(result=> result.insertedId);
  }
//TODO lo pongo aca porque es doy estoy, el problema es global, como se que es upsertedID?
  update(collection,id,data){
    return this.connect().then(db=>{
      //updateOne ES METODO DE MONGO
      return db.collection(collection).updateOne({_id:ObjectID(id)},{$set:data},{upsert:true});
    }).then(result=>result.upsertedId||id);
  }

  delete(collection,id){
    return this.connect().then(db=>{
      //deleteOne ES METODO DE MONGO
      return db.collection(collection).deleteOne({_id:ObjectID(id)});
    }).then(()=>id);
  }
}

module.exports = mongoLib;