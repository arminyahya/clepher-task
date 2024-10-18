const longMockResponse:any = {
    "Meta Data": {},
    "Time Series (5min)": {}
};
longMockResponse["Meta Data"] =  {
    "1. Information": "Intraday (5min) open, high, low, close prices and volume",
    "2. Symbol": "IBM",
    "3. Last Refreshed": "2024-10-16 19:55:00",
    "4. Interval": "5min",
    "5. Output Size": "Compact",
    "6. Time Zone": "US/Eastern"
};

for(let i=0; i<=1000; i++) {
    longMockResponse["Time Series (5min)"][i.toString()] ={
        "1. open": "233.0100",
        "2. high": "233.0100",
        "3. low": "233.0000",
        "4. close": "233.0000",
        "5. volume": "8"
    }
};

export default longMockResponse;