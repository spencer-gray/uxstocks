const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/:symbol/:field', async (req, res) => {
    try {
        const { symbol, field } = req.params;
        const response = await fetch(`${process.env.IEX_API_URL}/stock/${symbol}/${field}?token=${process.env.IEX_API_KEY}`)

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

//  chart data old structure from IEX Cloud (historical data calls are very expensive)
// router.get('/:symbol/chart/:timePeriod', async (req, res) => {
//     try {
//         const { symbol, timePeriod } = req.params;
//         const response = await fetch(`${process.env.IEX_API_URL}/stock/${symbol}/chart/${timePeriod}?token=${process.env.IEX_API_KEY}`)

//         // checking response type for invalid calls (might be fine with the catch, 
//         // this gives details on error type for developer)
//         if (response.statusText == 'Not Found') {
//             return res.status(404).json({
//                 message: 'Stock Not Found'
//             })
//         } else if (response.statusText == 'Forbidden') {
//             return res.status(404).json({
//                 message: 'Invalid field'
//             })
//         }

//         const data = await response.json();

//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Server error'
//         })
//     }
// });

// Chart Data v2
router.get('/:symbol/chart2/:startDate/:endDate', async (req, res) => {
    try {
        const { symbol, startDate, endDate } = req.params;
        const response = await fetch(`${process.env.TIINGO_API_URL}/daily/${symbol}/prices?token=${process.env.TIINGO_API_KEY}&startDate=${startDate}&endDate=${endDate}`)

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