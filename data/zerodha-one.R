if (!require("quantmod")) {
  install.packages("quantmod", repos="http://cran.rstudio.com/")
}
if (!require("RMongo")) {
  install.packages("RMongo", repos="http://cran.rstudio.com/")
}
if (!require("rmongodb")) {
  install.packages("rmongodb", repos="http://cran.rstudio.com/")
}
if (!require("xts")) {
  install.packages("xts", repos="http://cran.rstudio.com/")
}
if (!require("highfrequency")) {
  install.packages("highfrequency", repos="http://cran.rstudio.com/")
}
if (!require("curl")) {
  install.packages("curl", repos="http://cran.rstudio.com/")
}
if (!require("foreach")) {
  install.packages("foreach", repos="http://cran.rstudio.com/")
}

if (!require("rredis")) {
  install.packages("rredis", repos="http://cran.rstudio.com/")
}

#install.packages("quantmod") #Install the quantmod library
library("quantmod")  #Load the quantmod Library
library("rmongodb")  #Load the rmongodb Library
library("RMongo")  #Load the quantmod Library
library(xts)
library(highfrequency)
library(foreach)
library(rredis)

AllCharts <- function(x,symbol){
  
  t2 = xts(x,order.by=as.POSIXct(x$Date,format="%Y-%m-%d %H:%M:%S"))
  t2$Date=NULL
  
  t2$tmp = as.numeric(t2$Close,dropna=TRUE)
  lastSig <- Strategy(t2)
  UpdateSymbol(mongo,lastSig,symbol,'minute')
  
  Charting(t2$Close,symbol,'1m')
  emailNotification(lastSig,symbol)
  
  data2m = aggregatets(t2,on="minutes",k=2,dropna=TRUE)
  lastSig <- Strategy(data2m)
  UpdateSymbol(mongo,lastSig,symbol,'2minute')
  Charting(data2m$Close,symbol,'2m')
  emailNotification(lastSig,symbol)
  
  data5m = aggregatets(t2,on="minutes",k=5,dropna=TRUE)
  lastSig <- Strategy(data5m)
  UpdateSymbol(mongo,lastSig,symbol,'5minute')
  Charting(data5m$Close,symbol,'5m')
  emailNotification(lastSig,symbol)
  
  data30m = aggregatets(t2,on="minutes",k=30,dropna=TRUE)
  lastSig <- Strategy(data30m)
  UpdateSymbol(mongo,lastSig,symbol,'30minute')
  Charting(data30m$Close,symbol,'30m')
  emailNotification(lastSig,symbol)
  
  data1h = aggregatets(t2,on="hours",k=1,dropna=TRUE)
  lastSig <- Strategy(data1h)
  UpdateSymbol(mongo,lastSig,symbol,'1hour')
  Charting(data1h$Close,symbol,'1h')
  emailNotification(lastSig,symbol)
  
  data2h = aggregatets(t2,on="hours",k=2,dropna=TRUE)
  lastSig <- Strategy(data2h)
  UpdateSymbol(mongo,lastSig,symbol,'2hour')
  Charting(data2h$Close,symbol,'2h')
  emailNotification(lastSig,symbol)
}



Charting <- function(x,name,ts){
  png(paste('/var/www/rlearning/data/trend/',name,'-',ts,'.png',sep=''), width = 700, pointsize = 10)
  
  if(ts == '30m'){
    chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 10 days")
  }else if(ts == '1h'){
    chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 15 days")
  }else if(ts == '2h'){
    chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 20 days")
  }else if(ts =='4h'){
    chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 28 days")
  }else if(ts =='5m'){
    chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 2 days")
  }else{
    chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 1 days")
    
  }
  
  
  #Lets plot the data
  #chartSeries(x,theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset="last 6 days")
  
  dev.off()
}

DaysSinceMACross <- function(x, n) {
  prem <- Cl(x) - SMA(Cl(x), n)
  prem[seq_len(n)] <- 0
  x$grp <- cumsum(c(0, diff(prem > 0, na.pad=FALSE)) != 0)
  x$sign <- sign(prem)
  x$days <- ave(prem, x$grp, FUN=function(xx) 0:(NROW(xx) - 1))
  x$days * x$sign
}

# Calculate days of cross over of two moving avg
DaysSinceFastMACrossSlow <- function(x,f, s) {
  smadiff <- SMA(Cl(x), f) - SMA(Cl(x), s)
  smadiff[seq_len(s)] <- 0
  x$smagrp <- cumsum(c(0, diff(smadiff > 0, na.pad=FALSE)) != 0)
  x$smasign <- sign(smadiff)
  x$smadays <- ave(smadiff, x$smagrp, FUN=function(xx) 0:(NROW(xx) - 1))
  x$smadays * x$smasign
  crosdays <- x$smadays * x$smasign
}

UpdateSymbol <- function(mongo,x,symbol,duration) {
  buf <- mongo.bson.buffer.create()
  mongo.bson.buffer.append(buf, "code", symbol)
  mongo.bson.buffer.append(buf, "type", duration)
  criteria <- mongo.bson.from.buffer(buf)

  buf <- mongo.bson.buffer.create()
  mongo.bson.buffer.append(buf, "code", symbol)
  mongo.bson.buffer.append(buf, "trend", x$signal[[1]])
  mongo.bson.buffer.append(buf, "since", x$crosdays[[1]])
  mongo.bson.buffer.append(buf, "type", duration)
  mongo.bson.buffer.append(buf, "published", paste(Sys.Date()))

  objNew <- mongo.bson.from.buffer(buf)

  # if such a record exists; otherwise, insert this as a new reord
  namespace <- paste('zerodha.','trend',sep='')
  mongo.update(mongo, namespace, criteria, objNew, mongo.update.upsert)
}

Strategy <- function(x){
  x$crosdays <- DaysSinceFastMACrossSlow(x, 5,14)

  bband <- as.data.frame(BBands(Cl(x),n=20, sd=2))

  x$signal1 = signal1 <- ifelse(x$crosdays > 0 & x$crosdays < 10 ,ifelse(Cl(x) > bband$mavg & Cl(x) <= bband$up,1,0),0)

  x$signal2 = signal2 <- ifelse(x$crosdays < 0 & x$crosdays > -10 ,ifelse(Cl(x) < bband$mavg & Cl(x) >= bband$dn,-1,0),0)

  x$signal3 = signal3 <- ifelse((Hi(x) + Lo(x))/2 >= bband$up,10,0)

  x$signal4 = signal4 <- ifelse((Hi(x) + Lo(x))/2 <= bband$dn,-10,0)

  x$signal <- signal1 + signal2

  x$mysignal <- x$signal + signal3 +signal4

  lastSig <- tail(x,2)
}

pushToRedis <- function(key,msg,price){
  redisConnect()
  redisPublish('AdminTradeAlert', charToRaw(paste('{"code":"',key,'","msg":"',msg,'","price":"',price,'"}',sep='')))
  redisClose()
}

emailNotification <- function(lastSig,key){
  
  if(as.integer(lastSig[2]$mysignal) != as.integer(lastSig[1]$mysignal )){
    if(lastSig[2]$mysignal == 1){
      pushToRedis(key,"Enter long",lastSig[2]$Close)
      
    }else if(lastSig[2]$mysignal == -1){
      pushToRedis(key,"Enter Short",lastSig[2]$Close)
      
    }else if(lastSig[2]$mysignal < -1){
      
      pushToRedis(key,"Exit Short",lastSig[2]$Close)
      
    }else if(lastSig[2]$mysignal > 1){
      pushToRedis(key,"Exit Long",lastSig[2]$Close)
      
    }else if(lastSig[2]$mysignal == 0){
      
      #pushToRedis(key,"Nurtal",lastSig[2]$Close)
    }
  }
}


is.defined = function(x)!is.null(x)

args <- commandArgs(trailingOnly = TRUE)

symbol <- ifelse(is.defined(args[1]),paste(args[1]),'TCS')
duration <- ifelse(is.defined(args[2]),paste(args[2]),'day')

mongo <- mongo.create()
if(mongo.is.connected(mongo) == TRUE) {
  #mongo.get.databases(mongo)
}

stockData <- new.env() #Make a new environment for quantmod to store data in
mg1 <- mongoDbConnect('zerodha')
#get historical data for each symbol/code from mongodb
query1 <- dbGetQuery(mg1, 'symbols',"{}")

symbols <- query1[c('code')]
duration <- 'minute'
foreach(symbols[[1]], symbol=symbols[[1]]) %do% {
  
  #symbol <- 'NIFTY50'
  
  
  collection <- paste(duration,sep='')
  query <- dbGetQuery(mg1, collection,paste("{Code:'",symbol,"'}",sep=''),0,100000)
  stockData$data <- query[c('Date','High','Low','Open', 'Close','Volume')]
  stockData$data1 <- stockData$data[c("Date","Open","High","Low","Close","Volume")]
  stockData$data <- as.xts(stockData$data1[,-1],as.Date(as.POSIXct(stockData$data1$Date,format="%Y-%m-%d", tz="UTC")))
  
  # Sorting by date
  #attach(stockData$data)
  #stockData$data <- stockData$data[order(Date),]
  
  AllCharts(stockData$data,symbol)
  
}


