import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(express.json());

app.use(showPath);

function showPath(req: Request, res: Response, next: NextFunction) {
  console.log(req.path);
  next();
}

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

app.get("/api/interfaces", (req: Request, res: Response) => {
  res.send("Utilizando interfaces");
});

app.get("/api/json", (req: Request, res: Response) => {
  res.json({
    name: "shirt",
    price: 120.5,
    color: "blue",
    size: ["P", "M", "G"],
  });
});

app.get("/api/params/:id", (req: Request, res: Response) => {
  if (req.params.id == "1") {
    const item = {
      name: "zeenix",
      model: "Pro",
      price: 3499,
    };

    res.json(item);
  } else {
    res.send("Item não encontrado");
  }
  console.log(req.params);
});

app.get("/api/product/:id/review/:reviewid", (req: Request, res: Response) => {
  return res.send(
    `Acessando a review ${req.params.reviewid} do produto ${req.params.id}`
  );
});

function getUser(req: Request, res: Response) {
  console.log(`Resgatando usuário do id ${req.params.id}`);
  return res.send("Usuário encontrado");
}

app.get("/api/getuser/:id", getUser);

function checkUser(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === "1") {
    next();
  } else {
    return res.send("Acesso não autorizado");
  }
}

app.get("/api/user/:id/access", checkUser, (req: Request, res: Response) => {
  return res.send("Bem vindo a área administrativa");
});

app.get(
  "/api/user/:id/details/:name",
  (
    req: Request<{ id: string; name: string }>,
    res: Response<{ status: boolean }>
  ) => {
    console.log(`ID: ${req.params.id}`);
    console.log(`NAME: ${req.params.name}`);
    return res.json({ status: true });
  }
);

app.get("/api/error", (req: Request, res: Response) => {
  try {
    throw new Error("Algo deu errado");
  } catch (e: any) {
    res.status(500).json({ msg: e.message });
  }
});

app.listen(3000, () => {
  console.log("Aplicação de TS + Express funcionando");
});
