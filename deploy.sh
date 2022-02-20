#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -a
git commit -m 'New Deployment'
git push -f git@github.com:dairedo7/pagination-vuex.git master:gh-pages

cd -