#install.packages("RCurl")
library(quantmod)
library(RCurl)
#A great quantitative trading resource

sit = getURLContent('https://github.com/systematicinvestor/SIT/raw/master/sit.gz', binary=TRUE, followlocation = TRUE, ssl.verifypeer = FALSE)
con = gzcon(rawConnection(sit, 'rb'))
source(con)
close(con)
#Download Michael Kapler's “Systematic Investor Toolbox”, a powerful set of tools used to backtest and evaluate quantitative trading strategies

data <- new.env()
#Create a new environment





tickers<-spl('NIFTY50')
file.path<- '/var/www/zerodhaweb/data/day/’
#Specify the name of the asset and where the csv file is located on your computer. (You can find more ways to load data here.)
for(n in tickers) { data[[n]] = read.xts(paste(file.path, n, '.csv', sep=''), format='%y - %m - %d %H:%M') }
bt.prep(data, align='remove.na')
#Load and clean the data
prices = data$prices
models = list()





ColClasses = c("character","numeric","numeric","numeric","numeric")
historicalSet = read.table("/var/www/zerodhaweb/data/day/NIFTY50.csv", sep=",", header=TRUE)

historicalSet <-historicalSet[order(historicalSet$Date),]

dataset <- subset(historicalSet, select = c("Date","Open","High", "Low", "Close"))

names(dataset) <- c("Date","Open","High","Low","Close")

dataset <- xts(dataset,order.by=as.POSIXct(dataset$Date,format="%Y-%m-%d %H:%M:%S"))
dataset$Date = NULL

data$prices = dataset$Close
models = list()
#Specify the prices and store our models


# include technical indicators
ema <- EMA(dataset$Close,5) # lag = n-1 (default=9)
ema_diff <- dataset$Close - ema # lag = above

dataset$high_diff = dataset$High-dataset$Close
dataset$low_diff = dataset$Close-dataset$Low

dataset$len1 = dataset$high_diff + dataset$low_diff
hiper = dataset$high_diff/dataset$len1

buy.signal <- ifelse(hiper < 0.39,1,NA)
data$weight[] = NA
data$weight[] = buy.signal
models$long = bt.run.share(data, clean.signal=T, trade.summary = TRUE)
#Create our long model

sell.signal <- ifelse(hiper >= 0.39 & ema_diff < 32,-1,ifelse(hiper >=0.64,-1,NA))
data$weight[] = NA
data$weight[] = sell.signal
models$short = bt.run.share(data, clean.signal=T, trade.summary = TRUE)
#Create our short model

dates = '2015-03-26::2016-08-12'
#Isolate the5dates from our validation set (The data not used to train the model or create the rules, our out-of-sample test)

bt.stop.strategy.plot(data, models$longs, dates = dates, layout=T, main = 'Long Short Strategy', plotX = F)
#View a plot of our trades