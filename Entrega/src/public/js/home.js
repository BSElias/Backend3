console.log("Hola desde el server");

const socket = io();

socket.on("connect", ()=>{
    console.log("Conectado al Server");
});

socket.emit("saludo", { message: "Hola servidor" });

socket.on("saludo-respuesta", (data) => {
    console.log(data.message);
});

socket.on("disconnect", () => {
    console.log("Se desconecto el server");
});