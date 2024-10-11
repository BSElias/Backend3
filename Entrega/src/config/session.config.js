import session from "express-session";
import MongoStore from "connect-mongo";

export const config = (server) => {
    // Opciones de configuración para la sesión
    const getSessionOptions = () => {
        return {
            store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
            secret: process.env.SECRET_KEY,
            cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 horas
            saveUninitialized: false, // No guarda sesiones no inicializadas
            resave: false, // No resguarda si la sesión no ha cambiado
        };
    };

    // Middleware para manejar sesiones en el servidor
    server.use(session(getSessionOptions()));
};