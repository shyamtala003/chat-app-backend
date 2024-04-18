import app from "./app.js";

app.get("/", (request, response) => {
  return response.send("<h1>Hello world!</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(`server in running on PORT : ${process.env.PORT}`)
);
