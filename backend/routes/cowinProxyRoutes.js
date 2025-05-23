// backend/routes/cowinProxyRoutes.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Proxy route for districts
router.get('/districts/:stateId', async (req, res) => {
    const { stateId } = req.params;
    try {
        const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`, {
            headers: {
                'accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch districts' });
    }
});

export default router;
