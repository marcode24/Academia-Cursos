import express from 'express';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { createServer } from 'http';
import schema from './schema';
import expressPlayGround from 'graphql-playground-middleware-express';

const app = express();
app.use(cors());
app.use(compression());


const iniciarServidor = async() => {
    const servidor = new ApolloServer({
        schema,
        introspection: true
    });
    await servidor.start();
    servidor.applyMiddleware({app});
}

iniciarServidor();

app.get('/', expressPlayGround({
    endpoint: '/graphql'
}));

const httpServer = createServer(app);

const port = 5200;
httpServer.listen(port, () => console.log(`Servidor academia online listo http://localhost:${port}`));