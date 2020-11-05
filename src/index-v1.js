import {GraphQLServer} from "graphql-yoga"

//Demo user data
const users=[
               {
            id:"123",
            name:"Mohamed",
            email:"mmm@yahoo.com"
          
           },
           {
            id:"1234",
            name:"Ahmed",
            email:"Ahmed@yahoo.com",
            age:21
           }
        ]
const posts=[
    {
        id:"123",
        title:"Hello world",
        "body":"TEST"
    },
    {
        id:"456",
        title:"Hello 222world",
        "body":"TEST22"
    }
]

//Scaler types - String, Boolean, Int, Float, ID
// Type definitions (schema)
//! always return String
const typeDefs = `
    type Query{
        add(a:Int,b:Int):Int
        id:ID!
        addArr(data:[Int!]!):Float!
        employed:Boolean!
        gpa:Float
        name:String!
        location:String!
        bio:String! 
        age:Int!
        me:User!
        grads(data:[Int]):[Int!]!
        post:Post!
        greeting(name:String,position:String):String
        users(query:String):[User!]!
        posts(query:String):[Post!]!
        
    }
    type User{
        id:ID!
        name:String!
        email:String!
        age:Int
    }
    type Post{
        id:ID!
        body:String!
        title:String!
        published:Boolean!
        
    }
`
    


// Resolvers 
    // ( set of function , function that run for each of the operations that can be performed on our api )
    // will query data from db 
    // we have individual resolver for each property
const resolvers = {
    Query:{
    grads(parent,args,ctx,info){
        return args.data?args.data:[1,2,5]
    },
    addArr(parent,args,ctx,info){
        let sum=0
        if(args.data.length==0){
            return 0
        }

        return args.data.reduce((accumlator,currentValue)=>accumlator+currentValue)
        
     },
       name(){
           return "Mohamed Salah"
       },
       age(){
           return 23
       },
       gpa(){
           return 3.1
       },
       id(){
            return "abc123"
       },
       employed(){
           return true
       },
       add(parent,args,ctx,info){
            return args.a+args.b
       },
       greeting(parent,args,ctx,info){ // we will use it to save to db
    
        return args.name&&args.position?`${args.name}! you are my fav ${args.position}`:"Hello"
       },
       me(){ //get data from DB
           return {
               id:"123",
               name:"Mohamed",
               email:"mmm@yahoo.com",
               age:12
           }
       },
       post(){
        return {
            id:"123",
            title:"Mohamed",
            body:"mmm@yahoo.com",
            published:true
        }
       },
       users(parent,argx,ctx,info){
        if(!argx.query)
                    return users
        return users.filter((user)=>user.name.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
                 
               
            

       
       },
       posts(parent,argx,ctx,info){
           if(!argx.query){
               return posts
           }
           const titleMatch=posts.filter((post)=>post.title.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
           const bodyMatch=posts.filter((post)=>post.body.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
           return titleMatch||bodyMatch

       }


       
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{ //by default 4000 
    console.log("The server is up")
})