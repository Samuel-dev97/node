const expres = require("express");
const apiRoute = require("./routes/routes");

const app = expres();

const PORT = process.env.PORT || 3000;

app.use(expres.json());

app.use("/whatsapp", apiRoute);

app.listen(PORT, () => {console.log("el kat sik: "+ PORT)});
