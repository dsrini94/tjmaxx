const mongoClient = require('mongodb').MongoClient,
      url = "mongodb://localhost:27017/";
const data = [
    {
        "product_id":"so234",
        "product_name":"Sony Television",
        "barcode_no":"4548736023635",
        "brand":"Sony",
        "category":"Television",
        "image":"https://images.barcodelookup.com/4385/43854780-1.jpg",
      },
      {
        "product_id":"hb4457",
        "product_name":"Puma bag",
        "barcode_no":"888394341844",
        "brand":"Puma",
        "category":"Bags",
        "image":"https://images.barcodelookup.com/9112/91126547-1.jpg",
      },
      {
        "product_id":"nk1234",
        "product_name":"Nike T-shirt",
        "barcode_no":"887229466653",
        "brand":"Nike",
        "category":"Shirts",
        "image":"https://images.barcodelookup.com/3291/32913390-1.jpg",
      }
    ];

    mongoClient.connect(url,(err,client)=>{

    if(err) throw err;
    else{
      const db = client.db('tjmaxx');

      db.collection('products').insertMany(data,(err,result)=>{
        if(err) throw err;
        else console.log('data inserted');
      })
    }

    });
