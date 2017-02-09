When upgrading to v1.0.0-beta.30 use the following

yarn global remove angular-cli @angular/cli
yarn cache clean
yarn global add @angular/cli@latest 
rm -rf node_modules dist # use rmdir on Windows
yarn add @angular/cli@latest —dev
# remove any anugular-cli reference from package.json
yarn
ng update

