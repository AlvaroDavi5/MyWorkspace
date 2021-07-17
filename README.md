
# Getting Started

First, install all packages using _yarn_, for it enter in the repo directory and search by `package.json` file:
```bash
# install all packages from package.json
yarn install
```
Check the [Considerations](#package-manager-considerations) to understand the reason for using yarn.
<br>

After, run the development server with _npm_:
```bash
# run the development server
npm run dev
```

Or run the production server:
```bash
# run the build process
npm run build
# start server
npm start
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
___

## package-manager-considerations

The packages used need to be installed via yarn, due to incompatibility of dependencies by npm. However, after installed certain packages need to be runned via npm, due to yarn restrictions.
So use yarn to install and npm to run.
