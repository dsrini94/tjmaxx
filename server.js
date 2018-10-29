const app = require('express')(),
      mongoClient = require('mongodb').MongoClient,
      url = "mongodb://admin:admin1@ds121163.mlab.com:21163/tjmaxx",
    //url="mongodb://localhost:27017/",
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
app.get('/getproductData',(req,res)=>{
  var barcode_no = req.query.barcode_no;
  var product_details;
  var product_name;
  var product_id;
  var brand;
  var image;
  var category;

     mongoClient.connect(url,(err,client)=>{
        if(err) throw err;
        else{
          const db = client.db('tjmaxx');
          db.collection('products').find({"barcode_no":barcode_no}).toArray(function(err,result) {
            product_details=result;
            product_id=product_details[0].product_id;
            product_name=product_details[0].product_name;
            barcode_no=product_details[0].barcode_no;
            brand=product_details[0].brand;
            category=product_details[0].category;
            image=product_details[0].image;
            db.collection('returnProducts').update({barcode_no:barcode_no,},{$set:{product_id:product_id,product_name:product_name,brand:brand,category:category,image:image}},{upsert:true}),(function(err,result) {
                console.log("inserted succesfully");
              })
            db.collection('returnProducts').find({}).toArray(function(err,finalresult){
              res.json(finalresult);
            })
          });



        }
     })
})

app.get('/finalReturnData',(req,res)=>{
  mongoClient.connect(url,(err,client)=>{
     if(err) throw err;
     else{
       const db = client.db('tjmaxx');
       db.collection('returnProducts').find({}).toArray(function(err,finalresult){
         res.json(finalresult);
       })
     }
  })
})




app.get('/getReturnData',(req,res)=>{
  var return_invoice_barcodeNo = req.query.return_invoice_barcodeNo;
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
