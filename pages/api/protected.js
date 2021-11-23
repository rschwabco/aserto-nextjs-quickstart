import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function protectedResource(req, res) {
    try {
        const apiOrigin = process.env.NETLIFY ? `${process.env.URL}/.netlify/functions/api-server` : "http://localhost:3001"
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(`${apiOrigin}/api/protected`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        let secret

        const status = response.status
        switch (status) {
            case 403:
                res.status(403).json({ msg: "This resource is forbidden for this user" })
                break;
            case 500:
                res.status(500).json({ msg: "There was an error authenticating this user" })
                break;
            case 200:
                try {
                    secret = await response.json();
                    res.status(200).json(secret);
                } catch (e) {
                    res.status(500).json({ msg: "This was an error parsing the result" })
                }
                break;
        }
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
});
