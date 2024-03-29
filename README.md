<h1 align="center">Membership Project - Amazon</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/hzoou/membership-amazon#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/hzoou/membership-amazon/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
</p>

### 2019 Boostcamp Membership Mission 2
 > directory structure
 ```
 app
 ├── bin
 |   └── www
 ├── database
 |   └── config.js
 |   └── connection.js
 ├── middlewares
 |   └── auth.js
 |   └── multer.js
 |   └── passport.js
 |   └── session.js
 ├── models
 |   └── carousel.js
 |   └── table.js
 |   └── user.js
 ├── public
 |   └── images
 |   └── javascripts
 |       └── components
 |           └── Main-card.js
 |           └── Mini-carousel.js
 |           └── Table.js
 |       └── admin.js
 |       └── index.js
 |       └── signin.js
 |   └── static_root
 |   └── stylesheets
 |       └── admin.css
 |       └── index.css
 |       └── main-card.css
 |       └── mini-carousel.css
 ├── routes
 |   └── admin.js
 |   └── index.js
 |   └── logout.js
 |   └── signin.js
 ├── schema
 |   └── query.js
 ├── views
 |   └── admin.html
 |   └── main.html
 |   └── signin.html
 └── app.js
 ```

### Preview

> 메인 페이지
>
![](https://i.imgur.com/nMfrEEI.jpg)

> 로그인 페이지
>
![](https://i.imgur.com/kKX2eH5.png)

> 관리자 페이지
>
![](https://i.imgur.com/m24LchS.png)

### 🏠 [Homepage](http://106.10.56.165:3000/)
> 관리자 계정 : admin/admin
>
> 관리자 설정 : user table - authentic : 1 (default : 0)

## Install
> npm이 설치되어있지 않은 경우 (Ubuntu)
```sh
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
apt install nodejs
```
```sh
npm install
```

## Start

```sh
npm start
```

## Author

👤 **hzoou (Woo Hyeju)**

* Github: [@hzoou](https://github.com/hzoou)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/hzoou/membership-amazon/issues).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_