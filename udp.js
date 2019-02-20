const dgram = require('dgram');
const subnetInfo = require('subnet-info');
const networkInterfaces = require('os').networkInterfaces();

const server = dgram.createSocket("udp4");
const ipList = [];

server.on("error", err => {
    server.close();
});

server.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    ipList.push(rinfo.address);
});

server.on("listening", () => {
    server.setBroadcast(true);
});

server.bind(41234);

const robotId = Buffer.from("ORIGAKER-2018001");

for (const key in networkInterfaces) {
    networkInterfaces[key].forEach(item => {
        if (item.family == 'IPv4') {
            if (item.cidr !== '127.0.0.1/8') {
                const { broadcastAddress } = new subnetInfo(item.cidr).info();
                server.send(robotId, 8080, broadcastAddress);
            }
        }
    });
}