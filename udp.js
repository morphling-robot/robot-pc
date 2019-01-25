const dgram = require('dgram');

const server = dgram.createSocket("udp4");

server.on("error", err => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on("message", (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    // this.robotList.push("robot");
});

server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
    server.setBroadcast(true);
});

server.bind(8080);

const robotId = Buffer.from("ORIGAKER-2018001");

server.send(robotId, 8080, "255.255.255.255");