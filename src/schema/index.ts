import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import 'graphql-import-node';
import typeDefs from './schema.graphql';

import resolvers from '../resolvers/resolversMap';

const schema: GraphQLSchema = makeExecutableSchema ({
    typeDefs,
    resolvers
});

export default schema;