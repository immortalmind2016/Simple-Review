import { pubsub } from "..";


const Subscription={
    count:{
        subscribe(parent,args,{pubsub},info){
           let count=0
           setInterval(() => {
               count+=1
               pubsub.publish("count",{
                count
               })
           }, 1000);
           return pubsub.asyncIterator("count")
        } 
      },
      user:{
          subscribe(parent,args,ctx,info){
          
            throw new Error ("post not found")
              return pubsub.asyncIterator(`user`)
          }
      },
      comment:{
          subscribe(parent,args,{db},info){
            const post=db.posts.find((post)=>post.id==args.id)
            if(!post)
              return pubsub.asyncIterator(`comment_${args.postId}`)
          }
      },
      post:{
      subscribe(parent,args,{db},info){
        
          return pubsub.asyncIterator(`post`)
      }
  }
    
}
export default Subscription