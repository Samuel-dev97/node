const https = require("https");
function SendMessageWhatsApp(data){
    const options = {
        host: "graph.facebook.com",
        path: "/v16.0/111736778603551/messages",
        method: "POST",
        body: data,
        header: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAARJPiuyMFwBAGfqXSC2qxFeeqTHF9rn9PZBqWhxiNPZCCKveZB0n8HrJGcaV0bbZAQdofABemDO8SIm6l4jrTMY6M0DbHEQkJ8FznpBkYpS8JjTAzfgtgdX0NxWc3jG0QPCCdZAUZAcGCzsfjdxc1AXtZCycbjK5mp9oaVgKbKDxjWpbHiBMEkkKLx6U1w2qnReTOhBn15mAZDZD"
        }
    };
    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error =>{
        console.error(error);
    });

    req.write(data);
    req.end();

}

module.exports = {
    SendMessageWhatsApp
};