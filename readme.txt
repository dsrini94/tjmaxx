Mlab import and export database commands
mongoexport --db tjmaxx --collection purchasedOrderDetails --out tjmaxx.json
mongoexport --db tjmaxx --collection returnInvoiceDetails --out tjmaxx1.json
mongoimport -h ds121163.mlab.com:21163 -d tjmaxx -c purchasedOrderDetails -u admin -p admin1 --file tjmaxx.json
mongoimport -h ds121163.mlab.com:21163 -d tjmaxx -c returnInvoiceDetails -u admin -p admin1 --file tjmaxx1.json

//to connect to shell
mongo ds121163.mlab.com:21163/tjmaxx -u admin -p admin1



mongoimport -h ds121163.mlab.com:21163 -d tjmaxx -c products -u admin -p admin1 --file products.json
