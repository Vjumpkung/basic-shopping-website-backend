# Basic Shopping Website Backend

<img src="https://res.cloudinary.com/dtyymlemv/image/upload/b_white/v1705941451/basic-shopping-website/m9ga7odxqi2olz4somzu.png" width=150 height=150>

A backend for Basic Shopping Website.

[API Docs](http://api.basic-shopping-website.vjumpkung.dynv6.net/docs)

## Getting Started

To run backend in local, following these steps.

1.) Clone this repo.

```
git clone https://github.com/Vjumpkung/basic-shopping-website-backend.git
```

2.) set up .env and install dependencies
- first rename .env.example to .env 
  
```env
MONGO_URI=
MONGO_DB_NAME= <---- optional you can remove
SECRET=
PORT=
```

Fill out these 4 variables.

`MONGO_URI` is URI that connect to MongoDB.

`MONGO_DB_NAME` is MongoDB Database name (optional) default value is (`shopping-backend`)

`SECRET` is any kind of string for jwt-signing check maybe you can use Symmetric key.

`PORT` is application running port (default `3000`)

- second, install dependency.
```
npm install
```

3.) Running the app

```
# development
$ npm run start

# watch mode <--- auto reload
$ npm run start:dev

# production mode (require `npm run build` before)
$ npm run start:prod
```

## Features 

- Almost every features include `CRUD`.
- Auth Guard with role checking in some endpoints.

- [x] Products
- [ ] Orders (implement finished)
- [x] Shopping-Cart (ตะกร้า)
- [ ] Shipping (เลขที่จัดส่ง)
- [x] Users 
- [x] Auth
- [x] Settings
- [x] Choices
- [ ] Slips (Work in Progress...)
- [x] Addresses
  
*Tick means using in front-end already.