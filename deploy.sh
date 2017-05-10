#!/bin/bash

git add .
git commit -m 'make it better'
git push
gulp build
cd ..
cp -rf landing-page/dist/* landing-page-deploy/
cd landing-page-deploy
git add .
git commit -m 'make it better'
git push heroku master
