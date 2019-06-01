# Inferno-website

<p>&nbsp;</p>
<p align="center"><img src="https://avatars2.githubusercontent.com/u/14214240?v=3&s=400" width="150px"></p>
<p>&nbsp;</p>

## Installation

    npm install

## How to run

For development:

    npm run dev
    # webpack
    open http://localhost:8082
    # server
    open http://localhost:8080

For dev prod:

    npm run prod

## Deploying

Build:
    
    npm run build

Start:

    npm run start
    open http://localhost:8050
    
Deploy:

    now

1. we run `npm run build`
2. this creates the `dist` directory (_and so that we can copy things from `src`, and `public`, those sub directories_)
3. we copy the code, and run babel on `src` => `dist/src` (_this is done also when we run `now-build` using [zeit now static build](https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build#configuring-the-build-output-directory), configured in the [now.json](./now.json)_
4. `dist/src/server.js` is run with node

## Requirements

    Node 8+

## Useful links

* [Inferno](https://github.com/trueadm/inferno) - What this website is all about
* Project structure based on [Inferno-starter](https://github.com/nightwolfz/inferno-starter)
* Typescript project setup with ts-transform-inferno can be found [here](https://github.com/deamme/ts-transform-inferno).


## TODO
- [ ] should not transpile the server in the same way
- [ ] can use ts + babel...
- [ ] precompile the markdown
