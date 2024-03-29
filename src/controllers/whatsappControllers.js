const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const whatsappService = require("../services/whatsappService");
const samples = require("../shared/sampleModels");
const VerifyToken = (req, res) => {
    try{
        var accessToken = "RTQWWTVHBDEJHJKIKIKNDS9090DS";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if(challenge != null && token != null && token == accessToken){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

    }catch(e){
        res.status(400).send();
    }

}

const ReceivedMessage = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];

        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];

            var text = GetTextUser(messages);
           if("audio"){
            var data = samples.SampleAudio(number);
            whatsappService.SendMessageApp();
           }
           else if(text == "document"){
            var data = samples.SampleDocument(number);
            whatsappService.SendMessageApp();
           }
           else if(text == "buttons"){
            var data = samples.SampleButtons(number);
            whatsappService.SendMessageApp();
           }
           else if(text == "list"){
            var data = samples.SampleList(number);
            whatsappService.SendMessageApp();
           }
           
            

        }        

        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}
module.exports = {
    VerifyToken,
    ReceivedMessage
}