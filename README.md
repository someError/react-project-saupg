```
Пароли:
Сотрудник call-центра: call-center@websaupg.mosoblgaz.ru / VKcKPVkQzqn4
Оператор САУПГ: operator@websaupg.mosoblgaz.ru / UeZn7FFJcdjs
```

## Подготовка
```
npm install
```
Code style для JS – [standard](https://standardjs.com/).  
Убеждаемся, что в редакторе [активирован eslint](http://eslint.org/docs/user-guide/integrations).  
**Код с ошибками линтера приниматься не будет!** Если коммиты с ошибками линтера будут частыми, пойду на крайние меры и поставлю серверный git-хук, который не будет их пропускать.  
`npm run standard:lint`, `npm run stylelint:lint` – проверка кода на соответствие стайлгайду  
`npm run standard:fix`, `npm run stylelint:fix` – проверка и исправление ошибок (может автоматом исправлять не все ошибки, смотрим в отчёт о проверке и, если что-то остаётся, правим руками)

## Storybook
Запуск локальной копии Storybook:
```
npm run storybook
```

Билд статической копии:
```
npm run build-storybook
```
Сбилдится в папку `saupg-storybook`. Именно её можно будет положить в showroom

## Разработка
```
npm start
```
Запускает локальный сервер со всеми вебпаками, бабелями и иже с ними.