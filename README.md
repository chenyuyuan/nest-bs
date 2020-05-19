nest.js + vue.js

backend: 
    npm config set registry https://registry.npm.taobao.org
    npm i -g @nestjs/cli
    npm install --save @nestjs/mongoose mongoose
    npm install --save @nestjs/typeorm typeorm mysql
    npm install --save nodemailer
    npm install axios
    npm i --save redis
    npm install nestjs-redis --save
    npm install express-session --save
    npm install node-cmd
    npm run start

    generate:
    nest generate module/service/controller name

frontend:
    npm install -g @vue/cli
    npm install
    npm install axios --save
    npm i element-ui -S

    npm run serve

    