// const { createHmac } = await import('crypto');
//
//
// const generateJwt = () => {
//     const hash = createHmac('sha256', '109519d3-831b-4b7c-b5e2-9f1b457ef647');
//     const iat = Math.round(new Date().getTime() / 1000);
//     const exp = iat + 1800;
//
//     const header = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'JWT'})).toString('base64')
//     const payload = Buffer.from(JSON.stringify({sub: '4614fdb2-260c-43c4-b307-1e037197e31b', iat, exp})).toString('base64')
//
//     // truyền data để mã hoá
//     const dataHash = `${header}.${payload}`;
//     hash.update(dataHash);
//
//     const data = hash.digest('hex')
//     const sign = Buffer.from(data).toString('base64');
//
//     console.log("");
//     console.log("hash: ", data);
//     console.log("header: ", header);
//     console.log("payload: ", payload);
//     console.log("dataHash: ", dataHash);
//     console.log("sign: ", sign);
//
//     const jwt = `${header}.${payload}.${sign}`;
//     console.log("===== jwt: ", jwt)
//     return jwt
// }
//
// const jwt = generateJwt();
//
//
// // giai ma
// const verifyJwt = (jwt) => {
//     console.log("")
//     console.log("==============================")
//
//     const jws = jwt.split('.')
//
//     const hash = createHmac('sha256', '109519d3-831b-4b7c-b5e2-9f1b457ef647');
// // mã hoá lại thằng chữ ký header + . + payload
//     hash.update(`${jws[0]}.${jws[1]}`);
//     const data = hash.digest('hex')
//     const sign = new Buffer(jws[2], 'base64').toString('utf8')
//     console.log("array: ", jws)
//     console.log("hash: ", data)
//     console.log("sign: ", sign)
//     if(data === sign) console.log("Jwt do server tao")
//     else console.log("Jwt khong hop le")
//
// }
//
// verifyJwt(jwt);
// const arr = jwt.split(".")
// verifyJwt(`${arr[0]}.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.${arr[2]}`);