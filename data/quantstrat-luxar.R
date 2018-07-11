if (!require("quantstrat")) {
  install.packages("quantstrat", repos="http://R-Forge.R-project.org")
}
if (!require("blotter")) {
  install.packages("blotter", repos="http://R-Forge.R-project.org")
}
if (!require("doMC")) {
  install.packages("doMC", repos="http://R-Forge.R-project.org")
}
Sys.setenv(TZ="UTC")
require("quantstrat")
require("blotter")
require("quantmod")
require("xts")

data <- new.env()

data.dir <-'/var/www/zerodhaweb/data/3minute'
ALBK=read.zoo("/var/www/zerodhaweb/data/3minute/ALBK.csv",sep=",",header=TRUE,index.column=list(1),FUN = function(D) as.POSIXct(paste(D), format="%Y-%m-%d %H:%M:%S"))

#getSymbols(Symbols='ARVIND', return.class='xts',src='csv', dir='/var/www/zerodhaweb/data/3minute',col.names=c("Open","High","Low","Close","Volume"))


#ALBK = to.minutes30(ALBK)
ALBK=as.xts(ALBK)
class(ALBK)
head(ALBK)
myTheme<-chart_theme()
myTheme$col$dn.col<-'lightblue'
myTheme$col$dn.border <- 'lightgray'
myTheme$col$up.border <- 'lightgray'
chart_Series(ALBK,theme=myTheme)

# moving average lengths
.fast = 5
.slow = 14
# optimization range
.FastSMA = (3:9)
.SlowSMA = (10:20)
# trade parameters
.threshold = 0.0005
.orderqty = 1000
.txnfees = -6 # round-trip fee
# stop loss amount
.stoploss <- 0.30/100
.StopLoss = seq(0.05, 0.6, length.out=48)/100
# trading window
.timespan = '00:00/23:59'
# number of optimization samples
.nsamples=50

initDate = '2016-06-10'
portfolio.st = 'stock'
account.st = 'IB1'
strategy.st = 'luxor'
rm.strat(portfolio.st)
rm.strat(account.st)
initPortf(portfolio.st, symbols='ALBK', initDate=initDate, currency='USD')
initAcct(account.st, portfolios=portfolio.st,initDate=initDate,currency='USD')
initOrders(portfolio.st, initDate=initDate)
strategy(strategy.st, store=TRUE)

# Add indicators
add.indicator(strategy.st, name = "SMA",arguments = list(x = quote(Cl(mktdata)[,1]),n = .fast),label="nFast")
add.indicator(strategy.st, name="SMA",arguments = list(x = quote(Cl(mktdata)[,1]),n = .slow),label="nSlow")

#Crossover signals
add.signal(strategy.st, name='sigCrossover',arguments = list(columns=c("nFast","nSlow"), relationship="gte"),label='long')
add.signal(strategy.st, name='sigCrossover',arguments = list(columns=c("nFast","nSlow"), relationship="lt"),label='short')

# AddRule
add.rule(strategy.st, name='ruleSignal',
         arguments=list(sigcol='long' , sigval=TRUE,
                        orderside='long' ,
                        ordertype='stoplimit',
                        prefer='High',
                        threshold=.threshold,
                        orderqty=+.orderqty,
                        replace=FALSE
         ),
         type='enter',
         label='EnterLONG'
)

#Short entry rule
add.rule(strategy.st, name='ruleSignal',
         arguments=list(sigcol='short', sigval=TRUE,
                        orderside='short',
                        ordertype='stoplimit',
                        prefer='Low',
                        threshold=-.threshold,
                        orderqty=-.orderqty,
                        replace=FALSE
         ),
         type='enter',
         label='EnterSHORT'
)

#Long exit rule
add.rule(strategy.st, name='ruleSignal',
         arguments=list(sigcol='short', sigval=TRUE,
                        orderside='long' ,
                        ordertype='market',
                        orderqty='all',
                        TxnFees=.txnfees,
                        replace=TRUE
         ),
         type='exit',
         label='Exit2SHORT'
)

#Short exit rule
add.rule(strategy.st, name='ruleSignal',
         arguments=list(sigcol='long' , sigval=TRUE,
                        orderside='short',
                        ordertype='market',
                        orderqty='all',
                        TxnFees=.txnfees,
                        replace=TRUE
         ),
         type='exit',
         label='Exit2LONG'
)
# Apply strategy, update portfolio, and plot results
out <- applyStrategy(strategy.st, portfolio.st)

updatePortf(portfolio.st, Symbols='ALBK', Dates=paste('::',as.Date(Sys.time()),sep=''))

chart.Posn(portfolio.st, "ALBK", TA="add_SMA(n=10,col=2);add_SMA(n=30,col=4)",theme=myTheme)

PerformanceAnalytics:::textplot(t(tradeStats(portfolio.st, 'ALBK')))
mk <- mktdata['2016-08-23 15:00::2016-08-26 03:30']
mk.df <- data.frame(Date=time(mk),coredata(mk))
PerformanceAnalytics:::textplot(mk.df,show.rownames=F)

ob <- getOrderBook(portfolio.st)$stock$ALBK
ob.df <- data.frame(Date=time(ob),coredata(ob))
PerformanceAnalytics:::textplot(ob.df,show.rownames=F)
PerformanceAnalytics:::textplot(perTradeStats(portfolio.st,'ALBK'), show.rownames=F)

args(add.distribution)
add.distribution(strategy.st,
                 paramset.label = 'SMA',
                 component.type = 'indicator',
                 component.label = 'nFast',
                 variable = list(n = .FastSMA),
                 label = 'nFAST'
)

add.distribution(strategy.st,
                 paramset.label = 'SMA',
                 component.type = 'indicator',
                 component.label = 'nSlow',
                 variable = list(n = .SlowSMA),
                 label = 'nSLOW'
)

args(add.distribution.constraint)
add.distribution.constraint(strategy.st,
                            paramset.label = 'SMA',
                            distribution.label.1 = 'nFAST',
                            distribution.label.2 = 'nSLOW',
                            operator = '<',
                            label = 'SMA'
)

rm.strat(portfolio.st)
rm.strat(account.st)
initPortf(portfolio.st, symbols='ALBK', initDate=initDate, currency='USD')
initAcct(account.st, portfolios=portfolio.st,
         initDate=initDate, currency='USD')
initOrders(portfolio.st, initDate=initDate)

library(parallel)
detectCores()

if( Sys.info()['sysname'] == "Windows" )
{
  library(doParallel)
  registerDoParallel(cores=detectCores())
} else {
  library(doMC)
  registerDoMC(cores=detectCores())
}


results <- apply.paramset(strategy.st, paramset.label='SMA',
                          portfolio.st=portfolio.st, account.st=account.st, nsamples=0)
head(names(results),20)

tS <- results$tradeStats
idx <- order(tS[,1],tS[,2])
tS <- tS[idx,]
write.csv(tS,"ALBK-OPT.csv")   #finally writing it to csv file for future reference

PerformanceAnalytics:::textplot(t(tS)[,1:20])
# net profit
z <- tapply(X=tS[,"End.Equity"],INDEX=list(Fast=tS[,1],Slow=tS[,2]),FUN=sum)
z[1:20,1:20]

x <- as.numeric(rownames(z))
y <- as.numeric(colnames(z))
filled.contour(x=x,y=y,z=z,color = heat.colors,xlab="Fast MA",ylab="Slow MA")
title("Net Profit")
# maxdd
z <- tapply(X=tS[,"Max.Drawdown"],INDEX=list(Fast=tS[,1],Slow=tS[,2]),FUN=sum)
x <- as.numeric(rownames(z))
y <- as.numeric(colnames(z))
filled.contour(x=x,y=y,z=z,color = heat.colors,xlab="Fast MA",ylab="Slow MA")


# profit factor
z <- tapply(X=tS[,"Profit.Factor"],INDEX=list(Fast=tS[,1],Slow=tS[,2]),FUN=sum)
x <- as.numeric(rownames(z))
y <- as.numeric(colnames(z))
filled.contour(x=x,y=y,z=z,color = heat.colors,xlab="Fast MA",ylab="Slow MA")
title("Profit Factor")

# avg trade P&L
z <- tapply(X=tS[,"Avg.Trade.PL"],INDEX=list(Fast=tS[,1],Slow=tS[,2]),FUN=sum)
x <- as.numeric(rownames(z))
y <- as.numeric(colnames(z))
filled.contour(x=x,y=y,z=z,color = heat.colors,xlab="Fast MA",ylab="Slow MA")
title("Average Trade")

# return to maxdd
z <- tapply(X=tS[,"Profit.To.Max.Draw"],
            INDEX=list(Fast=tS[,1],Slow=tS[,2]),FUN=sum)
x <- as.numeric(rownames(z))
y <- as.numeric(colnames(z))
filled.contour(x=x,y=y,z=z,color = heat.colors,xlab="Fast MA",ylab="Slow MA")
title("Return to Max Drawdown")


rmdd <- tS$Profit.To.Max.Draw
idx <- order(rmdd,decreasing=T)[1:30]
labs <- paste(tS$nFAST[idx],tS$nSLOW[idx],sep="/")
barplot(rmdd[idx],names.arg=labs,col=4,las=2,main="Return to MaxDrawdown")

tradeGraphs (stats = tS, free.params = c("nFAST", "nSLOW"),
             statistics = c("Profit.To.Max.Draw","Net.Trading.PL", "Max.Drawdown",
                            "Avg.Trade.PL", "Num.Trades", "Profit.Factor"), title = '')
title("Max Drawdown")

PerformanceAnalytics:::textplot(t(tS)[,1:30])