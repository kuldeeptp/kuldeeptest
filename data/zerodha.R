if (!require("quantmod")) {
  install.packages("quantmod", repos="http://cran.rstudio.com/")
}
if (!require("RMongo")) {
  install.packages("RMongo", repos="http://cran.rstudio.com/")
}
if (!require("rmongodb")) {
  install.packages("rmongodb", repos="http://cran.rstudio.com/")
}
#install.packages("quantmod") #Install the quantmod library
library("quantmod")  #Load the quantmod Library
library("rmongodb")  #Load the rmongodb Library
library("RMongo")  #Load the quantmod Library




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
  mongo.bson.buffer.append(buf, "trend", x$signal)
  mongo.bson.buffer.append(buf, "since", x$crosdays)
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

  lastSig <- tail(x,1)
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
collection <- paste(duration,sep='')
collection
query <- dbGetQuery(mg1, collection,paste("{code:'",symbol,"'}",sep=''))
stockData$data1 <- query[c('date','high','low','open', 'close','volume')]

# Sorting by date
attach(stockData$data1)
stockData$data1 <- stockData$data1[order(date),]


lastSig <- Strategy(stockData$data1)

UpdateSymbol(mongo,lastSig,symbol,duration)