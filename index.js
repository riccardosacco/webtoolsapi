const DNS = require("dns");
const whois = require("whois");
const axios = require("axios");

const IPV4 = /^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/gim;
const HOSTNAME = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/gm;

const dns = (address, type) => {
  return new Promise((resolve, reject) => {
    DNS.resolve(address, type, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        resolve({ address });
      }
    });
  });
};

const lookup = async (hostname, type) => {
  try {
    const output = {};

    const records = await dns(hostname, type);

    console.log(records);
  } catch (err) {
    // console.error(err);
  }
};

const geoip = async ip => {
  const res = await axios.get(`http://ip-api.com/json/${ip}`);

  console.log(res.data);
};

const DNSRECORDS = [
  "ANY",
  "A",
  "AAAA",
  "CNAME",
  "MX",
  "PTR",
  "TXT",
  "SOA",
  "SRV",
  "PTR"
];

// DNSRECORDS.forEach(async record => {
//   const output = await dns("google.it", record);
//   console.log(output);
// });

// whois.lookup("google.com", (err, addr) => {
//   console.log(addr);
// });

console.log(geoip("47.53.242.75"));
