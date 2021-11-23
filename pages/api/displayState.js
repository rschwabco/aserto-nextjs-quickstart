import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import 'regenerator-runtime/runtime';

import createAsertoClient from '@aserto/aserto-spa-js';

export default withApiAuthRequired(async function shows(req, res) {
    try {
        const { method, path } = JSON.parse(req.body)
        const apiOrigin = process.env.NETLIFY ? `${process.env.URL}/.netlify/functions/api-server` : "http://localhost:3001"
        const { accessToken } = await getAccessToken(req, res);

        const aserto = await createAsertoClient({
            accessToken: accessToken,  // valid access token
            serviceUrl: apiOrigin, // defaults to window.location.origin
            policyRoot: process.env.POLICY_ROOT,        // policy root specified in the policy manifest
            endpoint: '/__displaystatemap'   // access map endpoint, defaults to /__displaystatemap
        });

        try {
            res.status(200).json(aserto.getDisplayState(method, path, process.env.POLICY_ROOT));
        } catch (e) {
            res.status(500).json({ msg: 'Error while trying to resolve display state map' })
        }

    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});
