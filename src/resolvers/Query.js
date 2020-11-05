const Query={
   
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
   users(parent,args,{db,prisma},info){
    const opArgs= {

    } //operation arguments 
    if(args.query){
        opArgs.where={
           OR:[
               { name_contains:args.query},
               { email_contains :args.query}
               
           ]
        }
    }
      return  prisma.query.users(opArgs,info)
       //nothing,string,Object

    /*if(!argx.query)
                return db.users
    return db.users.filter((user)=>user.name.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
             
           */
   },
   posts(parent,args,{db,prisma},info){ 
        let opArgs={}
       if(args.query){
        opArgs.where={
            OR:[
                {title_contains:args.query},
                {body_contains:args.query},
            ]
           }
       }
     /*  const titleMatch=db.posts.filter((post)=>post.title.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
       const bodyMatch=db.posts.filter((post)=>post.body.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
       return titleMatch||bodyMatch
*/
       
      return prisma.query.posts(opArgs,info)

   },
   comments(parent,args,{db,prisma},info){ 
    let opArgs={}
  
 /*  const titleMatch=db.posts.filter((post)=>post.title.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
   const bodyMatch=db.posts.filter((post)=>post.body.toLocaleLowerCase().includes(argx.query.toLocaleLowerCase()))
   return titleMatch||bodyMatch
*/
   
  return prisma.query.comments(opArgs,info)

}

   
}

export default Query