# Read Me

## Homework Assignment 1

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 
2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.  

### How To Use And What I Have Done.

`npm start` will start the production environment and the `npm run dev` will start the development enironment. The command is based on windows 10 commands, and not iOS. The run commands has a flag named --experimental-modules which allows me to use newer syntax with the `.mjs`-extension.

In the server.mjs file is a line: `import string_decoder from 'string_decoder'; const { StringDecoder } = string_decoder`. This is a work around for a earlier version in node 10, because it wasn't possible to: `import { StringDecoder } from 'string_decoder'`. 

I also put the router in a sepparate file to clean upp the server.mjs a little, I also think it is easier to control the routes if I put every route in their own file within the routes directory. I am inspired by angular structure, like putting each component in its own folder.

<br>

## Homework Assignment 2

In progress...

<br>

___

### Sources

[Pirple.com - Course](https://pirple.thinkific.com/courses/the-nodejs-master-class)  
[NodeJS - Documentation](https://nodejs.org/api/documentation.html)  
[Air BNB - Javascript standars](https://github.com/airbnb/javascript)  
[List of status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)  
[JS Docs](http://usejsdoc.org/index.html#block-tags)  

### Generate a SSL Key And Certificate
```bash
$openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

### Meta

| #               | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| __Author__      | Mikael Sundstrom                                              |
| __Tutor__       | Pirple.com                                                    |
| __Server side__ | NodeJS (v10.14.0)                                             |
| __Description__ | This is a repo where I show my homework assignments to pirple |
| __License__     | MIT                                                           |
