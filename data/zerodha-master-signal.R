          if (!require("quantmod")) {
            install.packages("quantmod", repos="http://cran.rstudio.com/")
          }
          if (!require("RMongo")) {
            install.packages("RMongo", repos="http://cran.rstudio.com/")
          }
          if (!require("rmongodb")) {
            install.packages("rmongodb", repos="http://cran.rstudio.com/")
          }
          
          if (!require("rredis")) {
            install.packages("rredis", repos="http://cran.rstudio.com/")
          }
          
          if (!require("jsonlite")) {
            install.packages("jsonlite", repos="http://cran.rstudio.com/")
          }
          if (!require("foreach")) {
            install.packages("foreach", repos="http://cran.rstudio.com/")
          }
          if (!require("lubridate")) {
            install.packages("lubridate", repos="http://cran.rstudio.com/")
          }
          #install.packages("quantmod") #Install the quantmod library
          library("quantmod")  #Load the quantmod Library
          library("rmongodb")  #Load the rmongodb Library
          library("RMongo")  #Load the RMongo Library
          library("rredis") #Load the rredis Library
          library("jsonlite")
          library("foreach")
          library("lubridate")
          
          
          
          
          
          
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
          
          UpdateSymbol <- function(mongo,x,symbol) {
            x = tail(x,1)
            buf <- mongo.bson.buffer.create()
            mongo.bson.buffer.append(buf, "code", symbol)
            criteria <- mongo.bson.from.buffer(buf)
            
            buf <- mongo.bson.buffer.create()
            #mongo.bson.buffer.append(buf, "code", symbol)
            mongo.bson.buffer.append(buf, "trend", as.integer(x$mysignal))
            mongo.bson.buffer.append(buf, "since", as.integer(x$crosdays))
            mongo.bson.buffer.append(buf, "published", paste(Sys.Date()))
            
            objNew <- mongo.bson.from.buffer(buf)
            
            buf <- mongo.bson.buffer.create()
            mongo.bson.buffer.append(buf, "$set", objNew)
            
            objNew1 <- mongo.bson.from.buffer(buf)
            
            # if such a record exists; otherwise, insert this as a new reord
            mongo.update(mongo, 'tradesamurai.symbols', criteria, objNew1)
          }
          
          Strategy <- function(x){
            x$crosdays <- DaysSinceFastMACrossSlow(x, 5,14)
            
            bband <- as.data.frame(BBands(Cl(x),n=20, sd=2))
            
            x$signal1 = signal1 <- ifelse(x$crosdays > 0 & x$crosdays < 10 ,ifelse((Hi(x) + Lo(x))/2 > bband$mavg & Cl(x) <= bband$up,1,0),0)
            
            x$signal2 = signal2 <- ifelse(x$crosdays < 0 & x$crosdays > -10 ,ifelse((Hi(x) + Lo(x))/2 < bband$mavg & Cl(x) >= bband$dn,-1,0),0)
            
            x$signal3 = signal3 <- ifelse((Hi(x) + Lo(x))/2 >= bband$up,10,0)
            
            x$signal4 = signal4 <- ifelse((Hi(x) + Lo(x))/2 <= bband$dn,-10,0)
            
            x$signal <- signal1 + signal2
            
            x$mysignal <- x$signal + signal3 +signal4
            
            lastSig <- tail(x,2)
            
          }
          
          Charting <- function(x,name){
            
            png(paste('/var/www/zerodhaweb/client/app/data/trend/',name,'.png',sep=''), width = 700, pointsize = 12)
            #png(paste('/var/www/Trade-Samurai/webapp/public/data/strategy/',name,'.png',sep=''), width = 700, pointsize = 12)
            #Lets plot the data
            chartSeries(x,type = "candlesticks",theme = "white",name=name ,TA="addSMA(n = 5, on = 1, overlay = TRUE, col = 'red');addSMA(n = 14, on = 1, overlay = TRUE, col = 'blue'); addBBands(n=20, sd=2)",subset='last 25 weeks')
            
            dev.off()
          }
          
          dateFomat <- function(x){
            x <- substr(x,5,29)
            x <- gsub('AEST ','',x)
            x <- gsub('AEDT ','',x)
            x <- gsub('UTC ','',x)
            strptime(paste(substr(x,17,20),' ',substr(x,1,15),sep=''), '%Y %B %d %H:%M:%S')
          }
          
          pushToRedis <- function(key,x){
            redisConnect()
            redisPublish('AdminTradeAlert', charToRaw(paste('{"code":"',key,'","trend":"',as.integer(x$mysignal),'","price":"',as.character(x$Close),'","since":"', as.integer(x$crosdays),'","published":"', paste(Sys.Date()),'"}',sep='')))
            redisClose()
          }
          
          emailNotification <- function(lastSig,key){
            
            if(as.integer(lastSig[2]$mysignal) != as.integer(lastSig[1]$mysignal )){
              
              pushToRedis(key,lastSig[2])
              
            }
          }
          
          
          
          mongo <- mongo.create()
          if(mongo.is.connected(mongo) == TRUE) {
            #mongo.get.databases(mongo)
          }
          #get currencies from redis
          redisConnect()
          redisSubscribe('AdminTradeAlert', pattern=TRUE)
          
          mg1 <- mongoDbConnect('zerodha')
          query1 <- dbGetQuery(mg1, 'symbols',"{}")
          symbols <- query1[c('code')]
          foreach(symbols[[1]], symbol=symbols[[1]]) %do% {
            
            #symbol <- 'NIFTY50'
            ColClasses = c("character","numeric","numeric","numeric","numeric")
            stockData <- new.env() #Make a new environment for quantmod to store data in
            stockData$data1 = read.table(paste("/var/www/zerodhaweb/data/day/",symbol,".csv",sep=''), sep=",", header=TRUE)
            stockData$data1 <-stockData$data1[order(stockData$data1$Date),]
            stockData$data1 <- subset(stockData$data1, select = c('Date','Open','High','Low','Close','Volume'))
            
            stockData$data1 <- as.xts(stockData$data1[,-1],as.Date(as.POSIXct(stockData$data1$Date,format="%Y-%m-%d", tz="UTC")))
            
            lastSig = Strategy(stockData$data1)
            
            Charting(stockData$data1,symbol)
            
            emailNotification(lastSig,symbol)
          }
          
