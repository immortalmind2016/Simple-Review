//Demo user data

const users=[
    {
 id:"1",
 name:"Mohamed",
 email:"mmm@yahoo.com"


},
{
 id:"2",
 name:"Ahmed",
 email:"Ahmed@yahoo.com",
 age:21

}
]
const posts=[
{
id:"123",
title:"Hello world",
"body":"TEST",
"author":'1'
},
{
id:"678",
title:"Hello world5",
"body":"TEST5",
"author":'1'
},
{
id:"456",
title:"Hello 222world",
"body":"TEST22",
"author":'2'
}
]
 const comments=[{
"id":"1",
"text":"hello",
"user":"1",
"post":"123"
},
{
"id":"2",
"text":"hello2",
"user":"2",
"post":"123"
},
]

 const db={
     users,
     posts,
     comments
 }
 export { db as default }