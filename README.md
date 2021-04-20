# Бэкенд Место на Express :small_blue_diamond:

### :computer: Установка и запуск проекта
>*клонируйте репозиторий*<br/>
> `git clone https://github.com/AlenaZavadskaya/express-mesto.git`<br/>
>*установите зависимости*<br/>
> `npm install`<br/>
>*запустите сервер*<br/>
> `npm run start`<br/>
>*запустите сервер с hot-reload*<br/>
> `npm run dev`

### :link: Доступ к API осуществляется через URL: 
https://api.alenazavadskaya.students.nomoredomains.monster/

### :key: Auth
- POST /signup - создание пользователя с переданными данными: name, avatar, email, password
- POST /signin - проверяет переданные email и password и возвращает JWT-token

### :man: User
- GET /users/me - возвращает информацию о пользователе (name, avatar и email)
- PATCH /users/me - обновляет данные пользователя (name, avatar и email)

### :closed_lock_with_key: Validation
- данные валидируются Joi и Celebrate до прихода на сервер
- использовано регулярное выражение для проверки URL

### :rocket: Технологии
- Node.js 
- Express.js 
- MongoDB 
- Rest API
- Celebrate
- Joi
- nginx 

### :wrench: To do
- вынести из файла app.js подключение роутов и централизованный обработчик ошибок
- добавить лайки и удаление карточек