const app = require('express')(),
      mongoClient = require('mongodb').MongoClient,
      url = "mongodb://admin:admin1@ds121163.mlab.com:21163/tjmaxx",
      PORT= process.env.PORT||5000;

app.get('/',(req,res)=>{
  res.send('tjmax server');
})

mongoClient.connect(url,(err,client)=>{
  if(err) throw err;
  else {
    console.log('mongo connected');
    const db = client.db('tjmax');
  }
})

app.get('/getOrderData',(req,res)=>{
  var barcode = req.query.barcode_no;
  //res.send(barcode);
     mongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        else{
          const db = client.db('tjmaxx');
          db.collection('purchasedOrderDetails').find({"barcode_no":barcode}).toArray(function(err,result) {
              client.close();
              res.json(result);
            })
        }
     })
})
app.listen(PORT,()=>console.log('server started'));
