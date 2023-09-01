document.getElementById("calculate").addEventListener("click", function () {
    const optionType = document.getElementById("option-type").value;
    const stockPrice = parseFloat(document.getElementById("stock-price").value);
    const strikePrice = parseFloat(document.getElementById("strike-price").value);
    const timeToExpiration = parseFloat(document.getElementById("time-to-expiration").value);
    const volatility = parseFloat(document.getElementById("volatility").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value);
    const dividend = parseFloat(document.getElementById("dividend").value);
    const pricingMethod = document.getElementById("pricing-method").value;

    // Implement option pricing logic based on the selected pricing method
    let optionPrice = 0;

    switch (pricingMethod) {
        case "black-scholes-discrete":
            // Calculate option price using Black-Scholes (Discrete)
            optionPrice = calculateBlackScholesDiscrete(optionType, stockPrice, strikePrice, timeToExpiration, volatility, interestRate, dividend);
            break;
        case "black-scholes-continuous":
            // Calculate option price using Black-Scholes (Continuous)
            optionPrice = calculateBlackScholesContinuous(optionType, stockPrice, strikePrice, timeToExpiration, volatility, interestRate, dividend);
            break;
        default:
            optionPrice = "Invalid pricing method";
            break;
    }

    // Display the calculated option price
    document.getElementById("option-price").textContent = optionPrice.toFixed(2);
});

// Calculate the cumulative distribution function (CDF) of the standard normal distribution
function normDist(x) {
    const a1 = 0.31938153;
    const a2 = -0.356563782;
    const a3 = 1.781477937;
    const a4 = -1.821255978;
    const a5 = 1.330274429;
    const p = 0.2316419;
    const c = 0.39894228;

    if (x >= 0) {
        const k = 1.0 / (1.0 + p * x);
        return (1.0 - c * Math.exp(-x * x / 2.0) * k *
            (k * (k * (k * (k * a5 + a4) + a3) + a2) + a1));
    } else {
        return 1.0 - normDist(-x);
    }
}

function calculateBlackScholesDiscrete(optionType, stockPrice, strikePrice, timeToExpiration, volatility, interestRate, dividend) {
    // Calculate Black-Scholes (Discrete) option price
    const d1 = (Math.log(stockPrice / strikePrice) + ((interestRate - dividend + (Math.pow(volatility, 2) / 2)) * timeToExpiration)) / (volatility * Math.sqrt(timeToExpiration));
    const d2 = d1 - volatility * Math.sqrt(timeToExpiration);

    if (optionType === "call") {
        return stockPrice * Math.exp(-dividend * timeToExpiration) * normDist(d1) - strikePrice * Math.exp(-interestRate * timeToExpiration) * normDist(d2);
    } else if (optionType === "put") {
        return strikePrice * Math.exp(-interestRate * timeToExpiration) * normDist(-d2) - stockPrice * Math.exp(-dividend * timeToExpiration) * normDist(-d1);
    } else {
        return "Invalid option type";
    }
}

function calculateBlackScholesContinuous(optionType, stockPrice, strikePrice, timeToExpiration, volatility, interestRate, dividend) {
    // Calculate Black-Scholes (Continuous) option price
    const d1 = (Math.log(stockPrice / strikePrice) + ((interestRate - dividend + (Math.pow(volatility, 2) / 2)) * timeToExpiration)) / (volatility * Math.sqrt(timeToExpiration));
    const d2 = d1 - volatility * Math.sqrt(timeToExpiration);

    if (optionType === "call") {
        return stockPrice * Math.exp(-dividend * timeToExpiration) * normDist(d1) - strikePrice * Math.exp(-interestRate * timeToExpiration) * normDist(d2);
    } else if (optionType === "put") {
        return strikePrice * Math.exp(-interestRate * timeToExpiration) * normDist(-d2) - stockPrice * Math.exp(-dividend * timeToExpiration) * normDist(-d1);
    } else {
        return "Invalid option type";
    }
}
