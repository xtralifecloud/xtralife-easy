# Welcome to Xtralife-easy

It will take 5 minutes (of which 4min of download time). It only depends on your internet connection speed!

## How to

First run `git clone https://github.com/xtralifecloud/xtralife-easy.git` to clone this repository.

Next install Docker for your platform (Linux / Mac / Windows).

Finally, run `docker-compose up -d`.

(Tip: `-d` runs everythig in the backgroud. You can also try without it.) 

## Some more details

The above 2 commands start a complete runtime environment composed of Xtralife-server, Xtralife-dashboard and their required support services 
(redis, mongodb and elasticsearch).

If you want to restart your xtralife-server service, run `docker-compose restart xtralife-server`.
Or `docker-compose restart xtralife-dashboard` for xtralife-dashboard.
Everytime you modify the configurations, you must restart the services. 

If you want to shut everything down, run `docker-compose down`.

Docker will create two folders :

- `./data` with all your data
- `./logs` with the logs from xtralife-server

In `./config/production.coffee` you'll find the configuration of the server, where you can configure things like
your games keys, your iOS and Android certificates, and various options. `production.coffee` overrides settings in
`default.coffee`... So you can also customize the options you see in `default.coffee`.

In `./config/batches/` you'll find node.js Javascript module files. They are just examples of batch/hook files,
 to help you get started easily.

In `./configDashboard/` you'll find another `production.coffee` file, for the dashboard. Use the same games descriptions
 as for xtralife-server.
 
If you want to check if everything works fine, visit http://localhost:2000/v1/ping : the server should answer.

Next, head to http://localhost:3000 and you should now see the dashboard (user: user, password: password).

# Important note on security

*Xtralife is designed to run on HTTPS/SSL in production*. It is your sole responsibility to secure your server and access to the
different services.

It is also your responbility to NOT commit your credentials to a public repository on github, and to change the default
dashboard user/password.

However, for a simple "quick and dirty" development environment, HTTPS/SSL is not required and this project can be used.

*If you don't have experience with docker and docker-compose, operations and security, you'll have only yourself to blame
if something bad happens*

Or you can use the hosted version of Xtralife, http://xtralife.cloud, which provides all the scalability and security
you need in production.