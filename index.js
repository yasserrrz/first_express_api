"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express(); // Importing express function
var port = 3003;
var users = [
    {
        id: 1,
        name: "yassr",
        email: "yasser@gmail.com",
    },
    {
        id: 2,
        name: "smmr",
        email: "smmr@gmail.com",
    },
    {
        id: 3,
        name: "loana",
        email: "loana@gmail.com",
    },
];
var posts = [
    {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit post one ",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
        userId: 1,
        id: 2,
        title: "qui est esse post 2 ",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut post 3",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
        userId: 1,
        id: 4,
        title: "ea molestias  exercitationem repellat qui ipsa sit aut post 4",
        body: "et  quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
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
app.use(function (req, res, next) {
    console.log("[".concat(new Date().toLocaleString(), "] ").concat(req.method, " ").concat(req.url));
    next();
});
app.use(express.json());
// Route handling
app.get("/", function (req, res) {
    res.send("Hello, Express with TypeScript!");
});
app.get("/getUsers", function (req, res) {
    res.json({ message: "success", users: users });
});
app.get("/getPosts", function (req, res) {
    res.json({ message: "success", posts: posts });
});
app.post("/addUser", function (req, res) {
    var addedUser = req.body;
    if ((addedUser === null || addedUser === void 0 ? void 0 : addedUser.name) && (addedUser === null || addedUser === void 0 ? void 0 : addedUser.email)) {
        var checkuser = users.find(function (e) {
            return e.email === (addedUser === null || addedUser === void 0 ? void 0 : addedUser.email);
        });
        if (!checkuser) {
            addedUser.id = users.length + 1;
            users.push(addedUser);
            res.json({ message: "success", users: users });
        }
        else {
            res.json({ message: "user allready exist" });
        }
    }
    if ((addedUser === null || addedUser === void 0 ? void 0 : addedUser.name) === "" || (addedUser === null || addedUser === void 0 ? void 0 : addedUser.email) === "") {
        res.json({ message: "Please inter data" });
    }
});
app.post("/addPost", function (req, res) {
    var addedPost = req.body;
    if (addedPost) {
        addedPost.id = posts.length + 1;
        posts.push(addedPost);
        res.json({ message: "success", users: users });
    }
    else {
        res.json({ message: "faild" });
    }
});
// Get all users sorted alphabetically by name
app.get("/getUsersSorted", function (req, res) {
    var sortedUser = users.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    res.json({ message: "success", users: sortedUser });
});
app.get("/getReversedPosts", function (req, res) {
    var reversedPost = __spreadArray([], posts, true);
    var swapedPost;
    for (var i = 0; i < Math.floor(reversedPost.length / 2); i++) {
        // Swap only the title and body, not the IDs
        var tempTitle = reversedPost[i].title;
        var tempBody = reversedPost[i].body;
        reversedPost[i].title = reversedPost[reversedPost.length - 1 - i].title;
        reversedPost[i].body = reversedPost[reversedPost.length - 1 - i].body;
        reversedPost[reversedPost.length - 1 - i].title = tempTitle;
        reversedPost[reversedPost.length - 1 - i].body = tempBody;
    }
    res.json({ message: "success", reversedPost: reversedPost });
});
/**
4- delete user
5- update user
6- search  user by id
 */
app.delete("/users/:id", function (req, res) {
    var id = req.params.id;
    var index = users.findIndex(function (item) {
        return item.id === Number(id);
    });
    console.log(index);
    if (index === -1) {
        return res.json({ message: "user is not exist" });
    }
    users.splice(index, 1);
    return res.json({ message: "success", users: users });
});
app.delete("/posts/:id", function (req, res) {
    var id = req.params.id;
    var index = posts.findIndex(function (item) {
        return item.id === Number(id);
    });
    console.log(index);
    if (index === -1) {
        return res.json({ message: "post is not exist" });
    }
    posts.splice(index, 1);
    return res.json({ message: "success", posts: posts });
});
app.patch("/users/:id", function (req, res) {
    var id = req.params.id;
    var index = users.findIndex(function (item) {
        return item.id === Number(id);
    });
    console.log(index);
    if (index === -1) {
        return res.json({ message: "user is not exist" });
    }
    var _a = req.body, name = _a.name, email = _a.email;
    if (name) {
        users[index].name = name;
    }
    if (email) {
        users[index].email = email;
    }
    return res.json({ message: "success", users: users });
});
app.patch("/posts/:id", function (req, res) {
    var id = req.params.id;
    var index = posts.findIndex(function (item) {
        return item.id === Number(id);
    });
    console.log(index);
    if (index === -1) {
        return res.json({ message: "post is not exist" });
    }
    var _a = req.body, title = _a.title, body = _a.body;
    if (title) {
        posts[index].title = title;
    }
    if (body) {
        posts[index].body = body;
    }
    return res.json({ message: "success", posts: posts });
});
app.get("/users/:id", function (req, res) {
    var id = req.params.id;
    var index = users.findIndex(function (item) {
        return item.id === Number(id);
    });
    console.log(index);
    if (index === -1) {
        return res.json({ message: "user is not exist" });
    }
    return res.json({ message: "success", user: users[index] });
});
app.get("/posts/:id", function (req, res) {
    var id = req.params.id;
    var index = posts.findIndex(function (item) {
        return item.id === Number(id);
    });
    console.log(index);
    if (index === -1) {
        return res.json({ message: "post is not exist" });
    }
    return res.json({ message: "success", post: posts[index] });
});
// Start the server
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
