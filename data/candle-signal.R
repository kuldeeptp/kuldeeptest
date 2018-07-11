if (!require("highfrequency")) {
  install.packages("highfrequency", repos="http://cran.rstudio.com/")
}
if (!require("quantmod")) {
  install.packages("quantmod", repos="http://cran.rstudio.com/")
}
if (!require("RMySQL")) {
  install.packages("RMySQL", repos="http://cran.rstudio.com/")
}
if (!require("rredis")) {
  install.packages("rredis", repos="http://cran.rstudio.com/")
}
library(highfrequency)
library(zoo)
library(xts)
library(quantmod)
library(RMySQL)
#library(rredis)
#myfulldata = read.csv('D://zerodhaweb/data/minute/BHARTIARTL.csv', header=T)
#myfulldata = xts(myfulldata,order.by=as.POSIXct(myfulldata$Date,format="%Y-%m-%d %H:%M:%S",tz="UTC"))
#myfulldata$Date=NULL

Sys.setenv(TZ="UTC")
# For simulation
limitCounter=300

#Strategy Input


pushToRedis <- function(key,x){
  redisConnect()
  redisPublish('ZAdminTradeAlert', charToRaw(paste('{"Code":"',key,'","trend":"',as.integer(x$sig),'","price":"',as.character(x$Close),'","stop":"', as.integer(x$sl),'","Res":"',nres,'","published":"', paste(Sys.Date()),'"}',sep='')))
  redisClose()
}
emailNotification <- function(lastSig,key){
  
  if(as.integer(lastSig[2]$sig) != as.integer(lastSig[1]$sig )){
    
    pushToRedis(key,lastSig[2])
    
  }
}


mydb = dbConnect(MySQL(), user='admin', password='P@thw0rd', dbname='ZStreamingQuotesDB', host='localhost')
rst = dbSendQuery(mydb, "SELECT * FROM `stockstrategy` limit 30")
stocks = fetch(rst, n=-1)
class(stocks)

for(i in 1:NROW(stocks)) {
  nres = as.integer(stocks[i,]$nres)
  nc = as.integer(stocks[i,]$nc)
  nsl = as.integer(stocks[i,]$nsl)
  ntp = as.integer(stocks[i,]$ntp)
  instrumentToken = as.integer(stocks[i,]$InstrumentToken)
  Code = stocks[i,]$Code
  
  #print(paste(nres,nc,nsl,ntp,instrumentToken,Code,sep=' , '))
  
  rs = dbSendQuery(mydb, paste("SELECT `Time`, `LastTradedPrice`, `Volume` FROM `StreamingQuoteMode_Modequote_Date08092016` WHERE `InstrumentToken`=",instrumentToken," Limit 200000",sep = ''))
  data = fetch(rs, n=-1)
  
  dat.xts = read.zoo(data,tz="",index=1,format="%H:%M:%S",header=TRUE)
  dat.xts <- as.xts(dat.xts)   ## otherwise you get an error align.time 
  
  bars <- period.apply(dat.xts, 
                       endpoints(dat.xts,"secs",60),
                       function(xx){
                         ticks=coredata(xx$LastTradedPrice)
                         c( first(ticks),max(ticks), min(ticks),
                            last(ticks), sum(xx$Volume) )
                       })
  colnames(bars) <- c("Open","High","Low","Close","Volume")
  #align.time(bars,60)
  customData = aggregatets(bars,on="minutes",k=nres,dropna=TRUE)
  #head(customData,20)
  #tail(customData,20)
  
  customData$maxC = max(last(customData$Close,nc))
  customData$minC = min(last(customData$Close,nc))
  
  sigUp = ifelse(customData$Close == max(last(customData$Close,nc)),1,0)
  sl1 =  ifelse(customData$Close == max(last(customData$Close,nc)),min(last(customData$Close,nsl)),0)
  
  sigDn = ifelse(customData$Close == min(last(customData$Close,nc)),-1,0)
  sl2 = ifelse(customData$Close == min(last(customData$Close,nc)),max(last(customData$Close,nsl)),0)
  
  
  customData$sig = sigUp + sigDn
  customData$sl = sl1 + sl2
  
  lastSig = tail(customData,2)
  emailNotification(lastSig,Code)
}

