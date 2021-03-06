#install.packages("RSNNS")
require("quantmod")
require("TTR")
require("jsonlite")
require("RSNNS")


ColClasses = c("character","numeric","numeric","numeric","numeric")
historicalSet = read.table("/var/www/zerodhaweb/data/day/NIFTY50.csv", sep=",", header=TRUE)

historicalSet <-historicalSet[order(historicalSet$Date),]

dataset <- subset(historicalSet, select = c("High", "Low", "Close"))

names(dataset) <- c("High","Low","Close")

# include technical indicators
ema <- EMA(dataset$Close,5) # lag = n-1 (default=9)
ema_diff <- dataset$Close - ema # lag = above
rsi <- RSI(dataset$Close) # lag = n (default=14)
smi <- SMI(HLC(dataset))     # lag = nSlow+nSig (default=34)
sar <- SAR(HLC(dataset))     # lag = 0

dataset$high_diff = dataset$High-dataset$Close
dataset$low_diff = dataset$Close-dataset$Low

high_diff = dataset$High-dataset$Close
low_diff = dataset$Close-dataset$Low
dataset$len1 = dataset$high_diff + dataset$low_diff
hiper = dataset$high_diff/dataset$len1
loper = dataset$low_diff/dataset$len1
change <- diff(dataset$Close, lag=3) # applies lag to the change calculation 

ema_lag <- lag.xts (ema, k=-1)


inputs <- data.frame(dataset$Close, ema, ema_diff, rsi, sar, high_diff, low_diff,hiper,loper)
names(inputs) <- c("close", "ema", "ema_diff", "rsi", "sar", "high_diff", "low_diff","hiper","loper")


#remove extra NAs due to technical indicator lags
inputs <- inputs[36:(NROW(inputs)-3),]
dataset <- dataset[36:(NROW(dataset)-3),]
ema_lag <- ema_lag[36:(NROW(ema_lag)-3)]
change <- change[36:NROW(change)]


#adds peaks and valleys
inputs$peakvalley=0
peaks <- findPeaks(dataset$Close, thresh=0.00015)
valleys <- findValleys(dataset$Close, thresh=0.00015)
inputs$peakvalley[peaks-1]=-1  #always lagged by 1
inputs$peakvalley[valleys-1]=1

data_in <- subset(inputs, select = c(close, ema))
data_out <- ema_lag

patterns <- splitForTrainingAndTest(data_in, data_out, ratio = 0.15)
patterns <- normTrainingAndTestSet(patterns, dontNormTargets = FALSE, type = "norm")  

jordannet <- jordan(patterns$inputsTrain, patterns$targetsTrain, size = c(10), learnFuncParams = c(0.2), maxit = 20000, inputsTest = patterns$inputsTest, targetsTest = patterns$targetsTest, linOut = FALSE)



write('Saving network....',stdout());

f <- file('/var/www/zerodhaweb/data/day/mynet_jordan.RData')
save(jordannet, file=f);
flush(f)
close(f)

write('Done \r\n',stdout())


write('\r\n',stdout())
