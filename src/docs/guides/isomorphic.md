# Isomorphic applications
At the moment we are seeing a popularity of single-page applications. They're good in many ways:
- Quick start
- Rich functionality. We can include absolutely anything there — pictures, videos in bundle
- Bundles are automatically optimized
- Responsive UI — we have everything loaded in bundle.
- Caching and offline work

However, in practice we can face a lot of problems:
- Poor SEO
- Bad performance when the application becomes large
- Inevitably some bits of application logic or view logic end up duplicated between client and server, often in different languages
### The solution is isomorphic application
What is Isomorphic application?
> By isomorphic we mean that any given line of code (with notable exceptions) can execute both on the client and server.<br>
Charlie Robbins
18 Oct 2011

### Concept
 1. Static markup renders on server: `renderToString()`
 2. Inferno on client side finds same HTML code and attaches the containers with events to existing elements: `hydrate()`

This means that it is enough to send only the part of HTML code that is necessary for rendering the page. All additional elements can be extracted and processed on the client side. You get the advantage of fast server-side loading and the ability to use the same components.

## Create isomorphic web application with InfernoJS

Following tools we will use to build application:
### Installing dependencies
Make new empty directory `mkdir my-app && cd my-app`.
 1. Run `npm init -y` to create new node project
 2. Install inferno packages `npm i -S inferno inferno-server`
 3. [Express](http://expressjs.com) — fast, flexible web server `npm i -S express`
 4. [FuseBox](https://fuse-box.org/) — blazing fast bundler/module loader `npm i -D fuse-box`
 5. [TSNode](https://github.com/TypeStrong/ts-node) to run typescript files `npm i -D ts-node @types/node`
 6. Inferno transformers for TypeScript `npm i -D ts-transform-inferno ts-transform-classcat`
### Configure FuseBox
**fuse.ts**
```ts
import { FuseBox, FuseBoxOptions, Sparky } from "fuse-box";
import path = require("path");
import TsTransformClasscat from "ts-transform-classcat";
import TsTransformInferno from "ts-transform-inferno";
let fuse: FuseBox;
const fuseOptions: FuseBoxOptions = {
   homeDir: "./src",
   output: "dist/$name.js",
   sourceMaps: { inline: false, vendor: false },
   transformers: {
      before: [TsTransformClasscat(), TsTransformInferno()]
   },
   plugins: []
};
const fuseClientOptions: FuseBoxOptions = {
   ...fuseOptions,
   plugins: [
	  // Setup client-side plugins here
      // CSSPlugin()
   ]
};
const fuseServerOptions: FuseBoxOptions = {
   ...fuseOptions
};
Sparky.task("clean", () => {
   Sparky.src("dist")
      .clean("dist")
      .exec();
});
Sparky.task("config", () => {
   fuse = FuseBox.init(fuseOptions);
   fuse.dev();
});
Sparky.task("test", ["&clean", "&config"], () => {
   fuse.bundle("client/bundle").test("[**/**.test.tsx]", null);
});
Sparky.task("client", () => {
   fuse.opts = fuseClientOptions;
   fuse
      .bundle("client/bundle")
      .target("browser@esnext")
      .watch("client/**")
      .hmr()
      .instructions("> client/index.tsx");
});
Sparky.task("server", () => {
   fuse.opts = fuseServerOptions;
   fuse
      .bundle("server/bundle")
      .watch("**")
      .target("server@esnext")
      .instructions("> [server/index.tsx]")
      .completed(proc => {
         proc.require({
            close: ({ FuseBox }) => FuseBox.import(FuseBox.mainFile).shutdown()
         });
      });
});
Sparky.task("dev", ["clean", "config", "client", "server"], () => {
   fuse.run();
});

```
### Project structure
 There are different ways to structure your project, the easiest one is: 
```
|-- fuse.ts
|-- package.json
|-- tsconfig.json
|-- dist
|   |-- client
|   |-- server
|-- src
   |-- assets
   |   |-- css
   |   |-- images
   |   |-- static
   |   |-- styles
   |-- client
   |   |-- index.tsx
   |   |-- components
   |       |-- App.tsx
   |-- server
      |-- index.tsx
```
Let's fill **client/index.tsx** with following code:
```jsx
import { Component } from "inferno";
import { hydrate } from "inferno-hydrate";
import App from "./components/App";
const wrapper = (
      <App />
);
hydrate(wrapper, document.getElementById("root"));
```
**server/index.tsx** 
```jsx
import * as express from "express";
import { renderToString } from "inferno-server";
import path = require("path");
import App from "../client/components/App";
const server = express();
const port = 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/static", express.static(path.resolve("./dist/client")));

server.get("/", (req, res) => {
   const wrapper = (
         <App />
   );
   res.send(`
   <!doctype html>
   <html>
       <head>
           <title>My Isomorphic App</title>
       </head>
       <body>
           <div id='root'>${renderToString(wrapper)}</div>
           <script src='./static/bundle.js'></script>
       </body>
   </html>
`);
});
let Server = server.listen(port, () => {
   console.log(`http://localhost:${port}`);
});

// Used to restart server by fuseBox
export async function shutdown() {
   Server.close();
   Server = undefined;
}
```
**App.tsx**
```jsx
import { Component } from "inferno";
interface IState {}
interface IProps {}
export default class App extends Component<IProps, IState> {
   constructor(props) {
      super(props);
   }
   public render() {
      return (
         <div>
	         <p>Hello, world!</p>
         </div>
      );
   }
}
```
**tsconfig.json**
```json
{
   "compilerOptions": {
      "module": "commonjs",
      "target": "esnext",
      "sourceMap": true,
      "jsx": "preserve",
      "importHelpers": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true
   },
   "exclude": ["node_modules", "fuse.ts"]
}

```
Well done! Last step: add a script in **package.json**
 `"dev": "node -r ts-node/register --inspect fuse.ts dev"`
 Try it! Run `npm run dev` and go to http://localhost:3001
 
[More complex examples](https://github.com/guuibayer/awesome-inferno#boilerplates)
