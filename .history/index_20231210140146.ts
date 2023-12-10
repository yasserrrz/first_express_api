import  { Request, Response, NextFunction  } from 'express';
import * as express from 'express';
import { User ,Post  } from './interface';

const app  = express(); // Importing express function

const port = 3003;





let users :User[]  = [
    {
        id : 1 , 
        name : "yassr",
        email:"yasser@gmail.com"
    },
    {
        id : 2, 
        name : "smmr",
        email:"smmr@gmail.com"
    },
    {
        id : 3 , 
        name : "loana",
        email:"loana@gmail.com"
    }
];

let posts : Post[] = [
    {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit post one ",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        userId: 1,
        id: 2,
        title: "qui est esse post 2 ",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }
    ,
    {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut post 3",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
    ,
    {
        userId: 1,
        id: 4,
        title: "ea molestias  exercitationem repellat qui ipsa sit aut post 4",
        body: "et  quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
]; 
/*
[
    {
        userId: 1,
        id: 1,
         title: "ea molestias  exercitationem repellat qui ipsa sit aut post 4",
        body: "et  quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        userId: 1,
        id: 2,
 title: "ea molestias quasi exercitationem repellat qui ipsa sit aut post 3",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
    ,
    {
        userId: 1,
        id: 3,
 title: "qui est esse post 2 ",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
        {
        userId: 1,
        id: 4,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit post one ",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
]; 



*/

// Middleware function to log the timestamp of each request
app.use( (req :Request , res : Response, next : NextFunction) => {
        console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
        next();
    });
    
    app.use(express.json());
// Route handling
app.get('/', (req : Request, res :Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.get('/getUsers' , (req :Request, res:Response)=>{
    res.json({message  : "success" , users})
})

app.get('/getPosts' , (req :Request, res:Response)=>{
    res.json({message  : "success" , posts})
})
app.post('/addUser',  (req :Request, res:Response)=>{

    let addedUser : User | undefined =   req.body ; 
    if(addedUser?.name && addedUser?.email ){
       let checkuser:User | undefined =  users.find((e)=>{
          return e.email === addedUser?.email
       })
       if(!checkuser){
        addedUser.id = users.length +1 ; 
        users.push(addedUser);
        res.json({message : "success" , users})
       }else{
        res.json({message : "user allready exist"})
       }
       
    }
    if(addedUser?.name === "" || addedUser?.email === ""){
       res.json({message : "Please inter data"})
    }
  
    
})
app.post('/addPost',  (req :Request, res:Response)=>{

    let addedPost : Post | undefined =   req.body ; 
        if(addedPost){
            addedPost.id = posts.length +1 ; 
        posts.push(addedPost);
        res.json({message : "success" , users})
        }else{
            res.json({message : "faild"})
        
        }

})

// Get all users sorted alphabetically by name 
app.get('/getUsersSorted' , (req :Request, res:Response)=>{
    let sortedUser : User[] = users.sort((a, b)=>{
        return a.name.localeCompare(b.name)
    })
    res.json({message  : "success" , users:sortedUser })
})
app.get('/getReversedPosts' , (req :Request, res:Response)=>{
    let reversedPost : Post[] = [...posts];
    let swapedPost : Post  ;

    for (let i: number = 0; i < Math.floor(reversedPost.length / 2); i++) {
        // Swap only the title and body, not the IDs
        let tempTitle: string = reversedPost[i].title;
        let tempBody: string = reversedPost[i].body;

        reversedPost[i].title = reversedPost[reversedPost.length - 1 - i].title;
        reversedPost[i].body = reversedPost[reversedPost.length - 1 - i].body;

        reversedPost[reversedPost.length - 1 - i].title = tempTitle;
        reversedPost[reversedPost.length - 1 - i].body = tempBody;
    }
    res.json({message  : "success" , reversedPost })
})

/**
4- delete user
5- update user
6- search  user by id
 */
app.delete('/user/:id' , (req :Request, res:Response)=>{
    const {id} = req.params;
   const index = users.findIndex((item)=>{
        return item.id === Number(id)
    })
    console.log(index)
   if(index === -1 ){
   return  res.json({message  : "user is not exist"  })
   }
   users.splice(index ,  1 );
  return res.json({message  : "success" , users : users })
})

app.delete('/post/:id' , (req :Request, res:Response)=>{
    const {id} = req.params;
   const index = posts.findIndex((item)=>{
        return item.id === Number(id)
    })
    console.log(index)
    if(index === -1 ){
     return   res.json({message  : "post is not exist"  })
       }
    posts.splice(index ,  1 );
     return res.json({message  : "success" , posts : posts })
})

app.patch('/user/:id', (req :Request, res:Response)=>{
    const {id} = req.params;
   const index = users.findIndex((item)=>{
        return item.id === Number(id)
    })
    console.log(index)
   if(index === -1 ){
   return  res.json({message  : "user is not exist"  })
   }
   const {name , email} =  req.body
   if(name ){
       users[index].name = name
    }
    if(email){
        users[index].email = email ; 
    }
    
  return res.json({message  : "success" , users : users })
})

app.patch('/post/:id', (req :Request, res:Response)=>{
    const {id} = req.params;
   const index = posts.findIndex((item)=>{
        return item.id === Number(id)
    })
    console.log(index)
   if(index === -1 ){
   return  res.json({message  : "post is not exist"  })
   }
   const {title , body} =  req.body
   if(title ){
       posts[index].title = title
    }
    if(body){
        posts[index].body = body ; 
    }
    
  return res.json({message  : "success" , posts : posts })
})


app.get('/user/:id' , (req :Request, res:Response)=>{
    const {id} = req.params;
   const index = users.findIndex((item)=>{
        return item.id === Number(id)
    })
    console.log(index)
   if(index === -1 ){
   return  res.json({message  : "user is not exist"  })
   }
  
  return res.json({message  : "success" , users : users })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


