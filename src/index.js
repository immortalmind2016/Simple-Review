import {GraphQLServer,PubSub} from "graphql-yoga"
import db from "./db"
import Query from "./resolvers/Query"
import Mutation from "./resolvers/Mutation"
import Post from "./resolvers/Post"
import User from "./resolvers/User"
import Comment from "./resolvers/Comment"
import Subscription from "./resolvers/Subscription"
export const pubsub = new PubSub();
import prisma from "./prisma"
// Resolvers 
    // ( set of function , function that run for each of the operations that can be performed on our api )
    // will query data from db 
    // we have individual resolver for each property
const resolvers = {
    Query,
    Mutation,
    Subscription,
    Post,
    User,
    Comment
    
    
  

}

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context:{ //passes database object to every resolver
       db,
       pubsub,
       prisma
    }
})

server.start(()=>{ //by default 4000 
    console.log("The server is up")
})