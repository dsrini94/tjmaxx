const app = require('express')(),
      mongoClient = require('mongodb').MongoClient,
      url = "mongodb://admin:admin1@ds121163.mlab.com:21163/tjmaxx",
      PORT= process.env.PORT||5000;
const bodyParser = require('body-parser');
var bodyparser=require('body-parser').json();
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
app.post('/returnInvoiceDetails',(req,res)=>
{
  var order_id="OR100001",
      return_invoice_barcodeNo="883153834881",
      barcode_no="883153834902",
      barcode_type="UPC";
      var order_details = req.body;
      console.log(req.body,"------------------------> data from req.body");
     mongoClient.connect(url,(err,client)=>{
         if(err) throw err;
         else{
           const db = client.db('tjmaxx');
           db.collection('returnInvoiceDetails').insert({order_id:order_id,return_invoice_barcodeNo:return_invoice_barcodeNo,barcode_no:barcode_no,barcode_type:barcode_type,order_details:order_details}),(function(err,result) {
               client.close();

             })
         }
     })
 res.send("returnInvoiceDetails added successfully")

})








app.listen(PORT,()=>console.log('server started on', PORT));
