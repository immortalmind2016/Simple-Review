import { Prisma } from "prisma-binding"
const prisma=new Prisma({
    typeDefs:"src/generated/prisma.graphql",
    endpoint:"http://localhost:4466",

})

export default prisma
/*
//prisma.query prisma.mutation prisma.subscription
const updatePostForUser=async(postId,data)=>{
    const exist=prisma.exists.Post({
        id:postId
    })
    if(!exist)
    throw new Error("post not found")
    const user=await prisma.mutation.updatePost({
        data:{
            ...data
        },
        where:{
            id:postId
        }
    })
    return user
}

updatePostForUser("ck8wqjm6x00q40716c64pbdge",{title:"Mohapost"})
.then(user=>{

    console.log(JSON.stringify(user,undefined,5))

})
const createPostForUser=async (authorId,data)=>{
    const exist=prisma.exists.User({
        id:authorId
    })
    if(!exist)
    throw new Error("post not found")
    const post=await prisma.mutation.createPost({
        data:{
            ...data,
            author:{
                connect:{
                    id:authorId
                }
            }
        }
    },"{id}")
    const user=await prisma.query.user({where:{id:authorId}},"{id name email posts {id title published}}")
    return user
}




createPostForUser("ck8wqjzzb00qv0716nra7tzkq",{title:"Mohamed Here","body":"BODY 2","published":true})
.then(user=>{

    console.log(JSON.stringify(user,undefined,5))

})

prisma.query.users(null,'{name email}').then((users)=>{
    console.log(JSON.stringify(users,undefined,5))
}).catch(e=>{
    console.log(e)
})

prisma.query.comments(null,'{text}').then((comments)=>{
    console.log(JSON.stringify(comments,undefined,5))
}).catch(e=>{
    console.log(e)
})*/