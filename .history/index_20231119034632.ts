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
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }
    ,
    {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
]; 


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
app.post('/addUser',  (req :Request, res:Response)=>{

    let addedUser : User | undefined =  
    
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
