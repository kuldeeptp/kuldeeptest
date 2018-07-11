require("quantmod")
require("TTR")
require("jsonlite")
require("RSNNS")


ColClasses = c("character","numeric","numeric","numeric","numeric")
historicalSet = read.table("/var/www/zerodhaweb/data/day/SBIN.csv", sep=",", header=TRUE)

historicalSet <-historicalSet[order(historicalSet$Date),]

dataset <- subset(historicalSet, select = c("Open","High", "Low", "Close"))

names(dataset) <- c("Open","High","Low","Close")
dataset$hh=runMax(Hi(dataset), 3)
lag(dataset$hh,-1)
dataset$mm=runMin(Lo(dataset), 3,lag=1)
sig <- ifelse(dataset$Close >= dataset$hh,1,0)


# include technical indicators
ema <- EMA(dataset$Close,5) # lag = n-1 (default=9)
ema_diff <- dataset$Close - ema # lag = above

dataset$high_diff = dataset$High-dataset$Close
dataset$low_diff = dataset$Close-dataset$Low


dataset$len1 = dataset$high_diff + dataset$low_diff
dataset$smarange = SMA(dataset$len1,5)
hiper = dataset$high_diff/dataset$len1

buy <- ifelse(hiper < 0.39,1,0)

sell <- ifelse(hiper >= 0.39 & ema_diff < 32,-1,ifelse(hiper >=0.64,-1,0))
dataset$hiper=hiper
dataset$sell =sell
dataset$buy =buy

