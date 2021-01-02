const functions = require( 'firebase-functions' );
const express = require( 'express' );

// Construct a schema, using GraphQL schema language
const typeDefs = require( './schemas/typeDefs' );

// Provide resolver functions for your schema fields
const resolvers = require( './resolvers/api-resolvers' );

// Provide resolver functions for authentication
const authResolvers = require( './resolvers/auth-resolvers' );

// Create GraphQL express server
const { ApolloServer } = require( 'apollo-server-express' );

// Setup express cloud function
const app = express();

// Create graphql server
const server = new ApolloServer( {
  typeDefs,
  resolvers,
  playground: false,
  context: async ( { req } ) => {
    const token = req.headers.authorization;
    console.log( 111, token );
    if ( token != '' ) {
      // const user = await resolvers.Query.getEntity( undefined, { f: token } );
      const user = await authResolvers.getAuthDoc( token );
      console.log( 999, user );
      return user[0];
    }
    else {
      return {};
    }
  },
} );
server.applyMiddleware( { app, path: '/v1', cors: true } );

console.log( ' ***  Started Apollo Server at', new Date().toString().split( ' ' )[4], ' ***' );

exports.api = functions.https.onRequest( app );