npm config set registry https://registry.npm.taobao.org
sudo cp /home/project/tools/vue.conf /etc/nginx/conf.d/vue.conf
sudo nginx
mongod --dbpath /home/project/db &
cd /home/project/back
npm i
cd /home/project/front
npm i
cd /home/project