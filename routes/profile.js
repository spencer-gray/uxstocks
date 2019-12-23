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

// // company info
// router.get('/:symbol/company', async (req, res) => {
//     try {
//         const { symbol } = req.params;
//         const response = await fetch(`${process.env.IEX_API_URL}/stock/${symbol}/company?token=${process.env.IEX_API_KEY}`)
//         const data = await response.json();
//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Server error'
//         })
//     }
// });

// // daily stock prices, updated every ~1min, last entry will be most recent
// router.get('/:symbol/intraday-prices', async (req, res) => {
//     try {
//         const { symbol } = req.params;
//         const response = await fetch(`${process.env.IEX_API_URL}/stock/${symbol}/intraday-prices?token=${process.env.IEX_API_KEY}`)
//         const data = await response.json();
//         res.json(data[data.length-1]);       // last entry (most recent)
//         //res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: 'Server error'
//         })
//     }
// }); 

module.exports = router;