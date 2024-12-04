import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello Express");
});

app.post("/api/product", (req, res) => {
  console.log(req.body);
  return res.send("Produto adicionado");
});

app.all("/api/check", (req, res) => {
  if (req.method === "POST") {
    return res.send("Incluiu uma informação");
  } else if (req.method === "GET") {
    return res.send("Leu uma informação");
  } else {
    return res.send("Método invalido");
  }
});

app.listen(3000, () => {
  console.log("Aplicação de TS + Express funcionando");
});
