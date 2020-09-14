const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Company details and stock price history data
router.get('/:symbol/:field', async (req, res) => {
    try {
        const { symbol, field } = req.params;
        const response = await fetch(`${process.env.IEX_API_URL_SAND}/stock/${symbol}/${field}?token=${process.env.IEX_API_KEY_SAND}`)

        // checking response type for invalid calls (might be fine with the catch, 
        // this gives details on error type for developer)
        if (response.statusText == 'Not Found') {
            return res.status(404).json({
                message: 'Stock Not Found'
            })
        } else if (response.statusText == 'Forbidden') {
            return res.status(404).json({
                message: 'Invalid field'
            })
        }

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

// Chart Data
router.get('/:symbol/chart2/:startDate/:endDate', async (req, res) => {
    try {
        const { symbol, startDate, endDate } = req.params;
        const response = await fetch(`${process.env.TIINGO_API_URL}/daily/${symbol}/prices?token=${process.env.TIINGO_API_KEY}&startDate=${startDate}&endDate=${endDate}`)
        
        if (response.status == 404) {
            return res.status(404).json({
                message: 'Stock Not Found'
            })
        } else  {
            const data = await response.json();

            res.json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


// Extracting Yearly Income Statement Data with Tiingo api
router.get('/:symbol/financial/income-statement-test', async (req, res) => {
    try {
        const { symbol } = req.params;
        const response = await fetch(`${process.env.TIINGO_API_URL}/fundamentals/${symbol}/statements?token=${process.env.TIINGO_API_KEY}`)
        
        if (response.status == 404) {
            return res.status(404).json({
                message: 'Stock Not Found'
            })
        } else  {
            const data = await response.json();

            // Find latest yearly report (quarter = 0)
            for (i=data.length-1; i >= 0; i--) {
                if (data[i].quarter == 0) {
                    result = data[i]
                }
            }

            res.json(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

// Extracting Quarterly EPSRevChart Data (Tiingo API Alternative - not complete)
// router.get('/:symbol/financial/eps', async (req, res) => {
//     try {
//         const { symbol } = req.params;
//         const response = await fetch(`${process.env.TIINGO_API_URL}/fundamentals/${symbol}/statements?token=${process.env.TIINGO_API_KEY}`)
        
//         if (response.status == 404) {
//             return res.status(404).json({
//                 message: 'Stock Not Found'
//             })
//         } else  {
//             const data = await response.json();

//             var result = [];

//             var n = 4
//             // Sort By Financial Quarter
//             for (i=0; i < n; i++) {
//                 if (data[i].quarter === "0") {
//                     n++;
//                 } else {
//                     result.push(data[i]);
//                 }
//             }

//             res.json(result);
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Server error'
//         })
//     }
// });

// quarterly financial income statement data
router.get('/:symbol/financial/income-statement', async (req, res) => {
    try {
        const { symbol } = req.params;
        const response = await fetch(`${process.env.FINANCIAL_MODELING_API_URL}/financials/income-statement/${symbol}?period=quarter&apikey=demo`)

        const data = await response.json();

        res.json(data.financials);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

// yearly financial income statement data
router.get('/:symbol/financial/income-statement/yearly', async (req, res) => {
    try {
        const { symbol } = req.params;
        const response = await fetch(`${process.env.FINANCIAL_MODELING_API_URL}/income-statement/${symbol.toUpperCase()}?period=yearly&apikey=demo`)

        const data = await response.json();

        console.log(response)

        res.json(data.financials[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

// retrieving ratings data
router.get('/:symbol/company/rating', async (req, res) => {
    try {
        const { symbol } = req.params;
        const response = await fetch(`${process.env.FINANCIAL_MODELING_API_URL}/rating/${symbol.toUpperCase()}?apikey=demo`)

        const data = await response.json();

        // error catch if data is empty
        if(Object.getOwnPropertyNames(data).length === 0) {
            return res.status(404).json({
                message: 'Empty rating'
            })
        }
        else {
            res.json(data);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

// initial splash page data
router.get('/landing', async (req, res) => {
    try {
        const response = await fetch(`${process.env.IEX_API_URL_SAND}/stock/market/batch?symbols=aapl,tm,goos,ge,googl,tu,iii,d&types=quote&token=${process.env.IEX_API_KEY_SAND}`)

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;