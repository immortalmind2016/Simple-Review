
import uuid from "uuid/v4"
//Enum
//UserRole - standart, editor, admin

//type User {
// role:UserRole!
//}
// laptop.isOn - true - false 
// by enum
// laptop.powerStatus - on - off - sleep

const Mutation={
    async createUser(parent,args,{db,pubsub,prisma},info){
        const emailTaken=await prisma.exists.User({email:args.data.email})
        if(emailTaken){
            throw new Error('Email taken.')
        }
       const user= await prisma.mutation.createUser({data:args.data },info)
       return user
       /* const emailTaken=db.users.some((user)=>user.email==argx.data.email)
        if(emailTaken){
            throw new Error('Email taken.')
        }
        const user={
           id:uuid(),
         ...argx.data
        }
        pubsub.publish("user",{
            user
        })
        db.users.push(user)
        
        
        return user*/
     
    },
    async deleteUser(parent,args,{prisma},info){
        const exist=await prisma.exists.User({id:args.id})
        if(!exist)
        throw Error("User not found")
        const user=await prisma.mutation.deleteUser({where:{id:args.id}},info)
       
         /*  const userIndex=db.users.findIndex((user)=>user.id===args.id)
            if(userIndex==-1){
            throw Error ("User not found.")
            }
          const deleteUsers=db.users.splice(userIndex,1) //index, how many items will removed
          db.posts=db.posts.filter((post)=>post.author!=args.id)
         db.comments=db.comments.filter((comment)=>comment.user!=args.id)

        return deleteUsers[0]*/
        return user
    },
    updateUser(parent,args,{db},info){
        const {id,data}=args
        const user=db.users.find((user)=>user.id==id)
        if(!user)
            throw new Error("user not found")
        if(typeof data.email==="string"){
            const emailTaken=db.users.some((user)=>user.email=data.email)//find at least one
            if(emailTaken)
                throw new Error("email already exist")
            user.email=data.email
        }
        if(typeof data.name==="string"){
            user.name=data.name
        }
        if(typeof data.age!=="undefined")
        {
            user.age=data.age
        }
       db.users=db.users.map((user)=>{
            if(user.id==args.id){
                user=user
            }
            return user
        })
        return user
    },
    
    createPost(parent,args,{db,pubsub},info){
     
         
        const userExists=db.users.some((user)=>user.id===args.data.author)
        if(!userExists){
            throw Error ("User not found.")
        }
        const post={
            id:uuid(),
           ...args.data
        }
        if(args.data.published)
        pubsub.publish(`post`,{
  
            post:{ //match with sub name
                data:post,
                mutation:"CREATED"
            }
        })
        db.posts.push(post)
        return post
    },
  async  deletePost(parent,args,{prisma},info){
      let exist=await prisma.exists.Post({id:args.id})
      if(!exist)
      throw Error("not found")
      let deletedPost=await prisma.mutation.deletePost({where:{id:args.id}},ino)

      return deletedPost
      /*  let postIndex=db.posts.findIndex((post)=>post.id==args.id)
      if(postIndex ==-1)
      throw Error("post not found")
        let deletedPost=db.posts.splice(postIndex,1)
        db.comments=db.comments.filter((comment)=>comment.post!=args.id)
        if(deletedPost[0].published)
        pubsub.publish(`post`,{
  
            post:{ //match with sub name
                data:post,
                mutation:"DELETED"
            }
        })
        return deletedPost[0]*/
    },
    updatePost(parent,args,{prisma},info){
        /*
        DONE BY PRISMA
        
        let {id,data}=args
        let exist=prisma.exists.Post({id}) 
       
        if(!exist){
             throw new Error("Post not found")
        }*/
        return prisma.mutation.updatePost({where:{id},data},info)
        
      /*  let {id,data}=args

        let post=db.posts.find((post)=>post.id==id)
        const originalPost={...post}
        if(!post){
             throw new Error("Post not found")
        }
        if(typeof data.title==="string"){
            post.title=data.title
        }
        if(typeof data.body==="string"){
            post.body=data.body
        }
        if(typeof data.published==="boolean"){
            post.published=data.published
        }
       
        if(originalPost.published&&!post.published)
        //deleted
        pubsub.publish(`post`,{
  
            post:{ //match with sub name
                data:originalPost,
                mutation:"DELETED"
            }
        })
        else if(!originalPost.published&&post.published){
            //Created
            pubsub.publish(`post`,{
  
                post:{ //match with sub name
                    data:post,
                    mutation:"CREATED"
                }
            })
        }else if(post.published){
            //updated
            pubsub.publish(`post`,{
  
                post:{ //match with sub name
                    data:post,
                    mutation:"UPDATED"
                }
            })
        }
        return post
*/
    },
    createComment(parent,args,{db,pubsub},info){
        const userExists=db.users.some((user)=>user.id===args.data.user)
        const postExist=db.posts.some((post)=>post.id===args.data.post)

        if(!(userExists||postExist)){
            throw Error ("User not found.")
        }
        const comment={
            id:uuid(),
              ...args.data
        }
        console.log(`comment ${args.data.post}`)
        pubsub.publish(`comment_${args.data.post}`,{
            comment:{
                data:comment,
                mutation:"CREATE"
            }
        })
        db.comments.push(comment)
        return comment
    },deleteComment(parent,args,ctx,info){
        const index=comments.findIndex((comment)=>comment.id!=args.id)
        if(index==-1)
        throw Error("comment not found")
        let deletedComments=comments.splice(index,1)
        pubsub.publish(`comment_${args.data.post}`,{
            comment:{
                data:deletedComments[0],
                mutation:"DELETED"
            }
        })
        return deletedComments[0]
    },
    updateComment(parent,argx,ctx,info){
        let {id,data}=args

        let comment=db.comments.find((comment)=>comment.id==id)
        if(!comment){
             throw new Error("comment not found")
        }
       
        if(typeof data.text==="string"){
            post.text=data.text
        }
        pubsub.publish(`comment_${args.data.post}`,{
            comment:{
                data:comment,
                mutation:"UPDATED"
            }
        })
        return comment

    }
}
export default Mutation