require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { displayStateMap, jwtAuthz } = require('express-jwt-aserto');

const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;
const isNetlify = process.env.NETLIFY;
const baseUrl = isNetlify ? process.env.URL : process.env.AUTH0_BASE_URL;
const routerBasePath = isNetlify ? '/.netlify/functions/api-server' : '/';

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`
    }),
    audience: audience,
    issuer: `${issuerBaseUrl}/`,
    algorithms: ['RS256']
});

//Aserto authorizer configuration
const authzOptions = {
    authorizerServiceUrl: process.env.AUTHORIZER_SERVICE_URL,
    policyId: process.env.POLICY_ID,
    policyRoot: process.env.POLICY_ROOT,
    authorizerApiKey: process.env.AUTHORIZER_API_KEY,
    tenantId: process.env.TENANT_ID
};
//Aserto authorizer middleware function
const checkAuthz = jwtAuthz(authzOptions)



if (!baseUrl || !issuerBaseUrl) {
    throw new Error('Please make sure that the file .env is in place and populated');
}

if (!audience) {
    console.log('AUTH0_AUDIENCE not set in .env. Shutting down API server.');
    process.exit(1);
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: baseUrl }));
app.use(bodyParser.json());
// Set up middleware to return the display state map for this service
router.use(displayStateMap(authzOptions));
router.get('/api/protected', checkJwt, checkAuthz, (req, res) => {
    res.send({
        msg: 'Very sensitive information presented here.'
    });
});


app.use(routerBasePath, router);

if (isNetlify) {
    const serverless = require("serverless-http");
    exports.handler = serverless(app);
} else {
    const server = app.listen(port, () => console.log(`API Server listening on port ${port}`));
    process.on('SIGINT', () => server.close());
}