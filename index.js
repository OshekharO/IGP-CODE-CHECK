const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for dynamic port

const requestHeaders = {
  'host': 'www.igp.com',
  'content-length': '27',
  'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
  'dnt': '1',
  'sec-ch-ua-mobile': '?1',
  'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept': '*/*',
  'x-requested-with': 'XMLHttpRequest',
  'sec-ch-ua-platform': 'Android',
  'origin': 'https://www.igp.com',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://www.igp.com/igp-select',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'en-US,en;q=0.9',
  'cookie': 'uniqueId=a0d2c1a9-564b-4aae-b0c1-1ebcad6e39ed; tokenid=3e586767-2914-4bf5-a61c-6c3f64dbcb5a; oldtokenid=0c06a231-895b-4188-b8f1-3898c30cb7d7; ab_reco=default; ab_multiple=ab_multiple_var2; ab_product_rank=ab_product_rank_var2; ab_convenience=ab_convenience_var2; ab_pdprevamp=ab_pdprevamp_var2; ab_desc=ab_desc_var2; ab_personalized_search=default; ab_select=ab_select_var2; ab_theme=92; ab_mobile_verify=ab_mobile_verify_var2; __utmzz_igp=utmcsr%3Dgoogle%7Cutmcmd%3Dorganic%7Cutmccn%3D(not%20set)%7Cutmctr%3D(not%20provided); __utmzzses_igp=1; setUtmSource=google; setUtmMedium=organic; setUtmCampaign=(not%20set); setUtmTerm=(not%20provided); setUtmSourceLM=google; setUtmMediumLM=organic; lp=%2Fredeem; ip=49.36.137.102; ipCountry=IN; igp=s%3A0a9919c3-9654-4db4-a97d-3fa81e8d8996.jj80KP4kGx3LEG69cjM5DYExd7JBWGzrs1Q%2FkSBRN2s; _gcl_au=1.1.1055285192.1719833472; __utmzz=utmcsr=google|utmcmd=organic|utmccn=(not set)|utmctr=(not provided); __utmzzses=1; _ga=GA1.1.1293684928.1719833473; _fbp=fb.1.1719833474826.287803470140811707; login-referrer=https%3A%2F%2Fwww.igp.com%2Fredeem; __stripe_mid=1ed79a30-d217-40f9-ae13-259b221f000c6d8628; __stripe_sid=e0aa01c8-2b60-4176-94b1-926376333b50e88f91; __stgeo=IjAi; __stbpnenable=MQ==; __stdf=MA==; __stat=IkJMT0NLIg==; m-cart=0; __stp=eyJ2aXNpdCI6Im5ldyIsInV1aWQiOiJmNDgzNzc2NC1hMjNmLTQxZDQtOGFmYy0wOGVjZjIzMjRhN2IiLCJjayI6Im9tZWVwZDAwOUBnbWFpbC5jb20ifQ==; unbxd.netcoreId=ImJjZWE1ZDY4NmY4ZjdiNDc2ODYxMjM0NjVjZDA1ZWU3YWViZjQ5NTM0MjhlZjlmNThlY2I3MTkxNmM4ZDFmNTci; _ga_YN504ENLFN=GS1.1.1719833473.1.1.1719833534.59.0.0; _uetsid=6cff1970379d11ef8882db19674de95f; _uetvid=6d0089e0379d11efb71a4bbc13034353; cto_bundle=qRGnBl9BJTJCNk95c0M3dldVYmFHdml0JTJCNkVEVHoyU1NHMSUyQm1qaDNVUGlGZ015R01NT3d3TUp1ZiUyQld6Q282aGhvJTJGeEd2R2dwaG9kJTJCaU55VmNDdnZMd0lIb3ZPNFJNRkExeklSV0ppR2dLbElMaEkxN0JPZ0FBdFY4TlljNUFEbVYlMkY3OVAz; __sts=eyJzaWQiOjE3MTk4MzM0NzUxNDIsInR4IjoxNzE5ODMzNTU0MTg1LCJ1cmwiOiJodHRwcyUzQSUyRiUyRnd3dy5pZ3AuY29tJTJGaWdwLXNlbGVjdCIsInBldCI6MTcxOTgzMzU1NDE4NSwic2V0IjoxNzE5ODMzNDc1MTQyLCJwVXJsIjoiaHR0cHMlM0ElMkYlMkZ3d3cuaWdwLmNvbSUyRnJlZGVlbSUyM2FjYy1tZW51IiwicFBldCI6MTcxOTgzMzUyNTM5NiwicFR4IjoxNzE5ODMzNTI1Mzk2fQ=='
};

const validateCode = async (code) => {
  const requestBody = `voucherCode=${code}`;
  const options = {
    method: 'POST',
    hostname: 'www.igp.com',
    path: '/igpselect/buyMembershipByVoucher',
    headers: requestHeaders,
    body: requestBody,
  };

  try {
    const response = await fetch('https://www.igp.com/igpselect/buyMembershipByVoucher', options);
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    throw error;
  }
};

app.post('/api/validate-code', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Please enter a voucher code.' });
  }

  try {
    const responseBody = await validateCode(code);
    res.json(responseBody);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error validating code. Please try again later.' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
