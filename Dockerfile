FROM node:14.16.1-alpine
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "yarn.lock", "./"]
COPY ./ckeditor5 /usr/src/app/ckeditor5
RUN yarn global add react-app-rewired env-cmd
RUN yarn run build:editor
RUN rm -rf node_modules && yarn install --frozen-lockfile
COPY . .
RUN yarn build
CMD ["yarn", "start"]