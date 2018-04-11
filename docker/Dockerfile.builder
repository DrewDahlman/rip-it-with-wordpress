FROM node:6

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y ruby openssh-server openssh-client ruby-dev
RUN gem install sass

RUN mkdir /src

RUN npm install gulp-cli -g

WORKDIR /src
ADD build-files /src
ADD wordpress /app
ADD src /src/src
RUN npm install

# EXPOSE 3000
# EXPOSE 35729