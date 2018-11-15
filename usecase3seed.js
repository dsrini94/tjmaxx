const mongoClient = require('mongodb').MongoClient,
      url = "mongodb://localhost:27017/";
const data = [
    {
        "product_id":"me123",
        "product_name":"Merrell",
        "barcode_no":"61377450000599",
        "brand":"Merrell",
        "category":"Commuter sneakers",
        "image":"https://www.decathlon.co.uk/media/838/8385082/big_389c8a89-3801-448a-9c3f-091c27106369.jpg",
        "price":"$39"
      },
      {
        "product_id":"de123",
        "product_name":"Denizen by Levis",
        "barcode_no":"192379357608",
        "brand":"Levis",
        "category":"208 regular taper jeans",
        "image":"https://images.barcodelookup.com/9879/98792992-1.jpg",
        "price":"$16"
      },
      {
        "product_id":"be1234",
        "product_name":"Bern",
        "barcode_no":"843990058534",
        "brand":"Bern",
        "category":"Tween Bandito ski helmet",
        "image":"https://images.barcodelookup.com/66/662400-1.jpg",
        "price":"$39"
      },
      {
        "product_id":"be1234",
        "product_name":"Bebe",
        "barcode_no":"m",
        "brand":"Bebe",
        "category":"big girls ribbed top with rhinestone logo",
        "image":"https://images.barcodelookup.com/5331/53310837-1.jpg",
        "price":"$12"
      },
      {
        "product_id":"de1234",
        "product_name":"Diesel",
        "barcode_no":"71181370040412",
        "brand":"Diesel",
        "category":"Designer sunglasses",
        "image":"https://images.barcodelookup.com/10176/101769988-1.jpg",
        "price":"$29"
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
