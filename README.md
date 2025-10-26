# local 
ng build --configuration production
npx http-server -p 8080 -c-1 dist/news-app/browser 
+ node server.js

or ng serve

------
# on server 
ng build --configuration production
+ pm2 start server.js

