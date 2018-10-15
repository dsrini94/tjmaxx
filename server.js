const app = require('express')(),
      mongoClient = require('mongodb').MongoClient,
      url = "mongodb://admin:admin1@ds121163.mlab.com:21163/tjmaxx",
      PORT= process.env.PORT||8080;
const bodyParser = require('body-parser');
var bodyparser=require('body-parser').json();
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

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
app.post('/returnInvoiceDetails',bodyparser,(req,res)=>
{
console.log(req.body,"------------------------> data from req.body");
  var order_id="OR100001",
      return_invoice_barcodeNo="715676017633",
      barcode_no="031655337913",
      barcode_type="UPC";
      var order_details = req.body;

     mongoClient.connect(url,(err,client)=>{
         if(err) throw err;
         else{
           const db = client.db('tjmaxx');
           db.collection('returnInvoiceDetails').update({order_id:order_id},{$set:{order_details:order_details}}),(function(err,result) {
               client.close();

             })
        }
     })
 res.send("response from server");

})

app.get('/getReturnData',(req,res)=>{
  var return_invoice_barcodeNo = req.query.return_barcode_no;
  //res.send(barcode);
     mongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        else{
          const db = client.db('tjmaxx');
          db.collection('returnInvoiceDetails').find({"return_invoice_barcodeNo":return_invoice_barcodeNo}).toArray(function(err,result) {
              client.close();
              res.json(result);
            })
        }
     })
})






app.listen(PORT,()=>console.log('server started on', PORT));
