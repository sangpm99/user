const iat = Math.round(new Date().getTime()/ 1000);
const exp = iat + 1000;

const header = Buffer.from(JSON.stringify({alg: ''}))