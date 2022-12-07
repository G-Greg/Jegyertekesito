# Jegyértékesítő with Angular and ASP.NET Core

[![Npm package version](https://img.shields.io/badge/angular-v13.3.0-red)](https://www.npmjs.com/search?ranking=popularity&q=angular)
[![Npm package version](https://img.shields.io/badge/bootstrap-v5.2.3-blue)](https://www.npmjs.com/package/bootstrap)
[![Npm package version](https://img.shields.io/badge/ng--bootstrap-v12.1.2-important)](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap)
[![Npm package version](https://img.shields.io/badge/angular--fontawesome-v0.10.2-brightgreen)](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)

## Jegyértékesítő webalkalmazás
A webes portál, ahol jegyeket lehet megvásárolni. Az adminisztrációs felületen
lehet eseményeket felvinni, az egyes eseményekhez pedig beállítani, hogy milyen
kategóriájú jegyekből hány darab árusítható. A vásárlók bejelentkezés nélkül is tudják
böngészni a naptárat, ill. bejelentkezés után tudnak jegyet vásárolni. A weboldalt egy
adatbázis fogja segíteni a megfelelő működés eléréséhez. A frontend pedig angular segítségével jelenik meg egy böngészőben.

## A weboldal felépítése
### A főoldal
- Két nézetet tartalmaz. Megnyitáskor a naptár nézet jelenik meg. Ahol esemény található ott az lila színezéssel kiemelkedik.
A második néztet az egy listanézet ahol listaszerűen lehet böngészni az események közül.
<p align="center">
<img src="https://user-images.githubusercontent.com/24989500/205486978-d817b457-552e-4565-8867-03f33c6c2579.png" width="500">
<img src="https://user-images.githubusercontent.com/24989500/206264448-220093e2-8a84-447a-9402-89d5075e8036.png" width="500">
</p>


### Esemény hozzáadása
- Admin felhasználó bejelentkezése után lehetőség van új eseményt hozzáadni az alábbi űrlap kitöltésével. A jegyekből csak azt a kategóriát érdemes kitölteni amelyiket szeretnénk árusítani. Amennyiben 0 darabon és 0 áron hagyjuk nem lesz lehetséges olyan jegyet kapni.
<p align="center">
<img src="https://user-images.githubusercontent.com/24989500/205489844-85115f93-df5c-41f0-98f4-fffa122d2f6b.png" width="500">
</p>

- Kép feltöltésén kívül mindegyik input-ot ki kell tölteni az esemény létrehozásához.

  - **Description**: Az esemény megnevezése, rövid leírása.
  - **Location**: Az esemény helyszíne, hol fog zajlani.
  - **Category**: A jegy típusai, ami lehet ***Early Bird, Last Minute, Normal vagy VIP***
  - **Event start / Event end**: Az esemény kezdetét és végét jelöli meg.
  - **About**: Az esemény hosszabban kifejtett leírása
  - **Upload event image**: Az eseményről egy borítókép

### Esemény szerkesztése / törlése
- Kizárólag csak admin felhasználóval lehetséges. Szerkesztéskor megjelenik egy ugyan olyan felület, mint a létrehozáskor csak itt már a meglevő adatokkal jelenik meg. Törlés is csak admin felhasználóval lehetséges.

### Jegyvásárlása
- Az esemény rákattintásával lehet megnézni a jegyek árát és kategóriáját.
<p align="center">
<img src="https://user-images.githubusercontent.com/24989500/206264823-be50da3b-ede3-45e5-bbe3-c108b22ff107.png" width="500">
</p>

- Bejelentkezést követően a felhasználók megtudják venni a kiválasztott jegyet.
<p align="center">
<img src="https://user-images.githubusercontent.com/24989500/205491708-03b303a9-3082-425a-b80c-e45fe648afb9.png" width="500">
</p>


## Strukturális felépítése

### Frontend
Hat lényegi Angular komponensből áll össze
- <ins>**Home**</ins> a főoldal megjelenéséért felelős.
- <ins>**Login**</ins> a bejelentkezést teszi lehetővé, hogy lehessen jegyet vásárolni.
- <ins>**Registration**</ins> a regisztrációt teszti lehetővé a felhasználók számára.
- <ins>**Event List**</ins> a naptár nézetben listázza a kivalaszott napon az eseményeket.
- <ins>**Tickets**</ins> a kiválaszott eseménynél listázza az elérhető jegyeket.
- <ins>**Summary**</ins> a kiválasztott jegy és esemény összesítő oldala, ahol a jegyet lehet megvenni.

### Backend
ASP.NET Core keretrendszer SQL adatbázissal
- A backend három modelből épül fel.
  - <ins>**User**</ins> egy felhasználót reprezentál.
  - <ins>**Event**</ins> egy eseményt reprezentál.
  - <ins>**Ticket**</ins> egy jegyet reprezentál az eseményben.
 
- Mindegyik modelhez tartozik egy *Service* és egy *Controller* osztály ami segítésével össze van kötve az adatbázis az API hívásokkal.


## Használata

**Frontend**

[Node.js](https://nodejs.org/) telepítés után a projekt könyvtárában egy terminál ablakban az alábbi parancsok kiadásával indítható program.
Első futtatáskor a node modulok telepítése szükséges.
```
npm install
```
Projekt indítása.
```
npm start
```
Az alkalmazás a [https://localhost:4200](https://localhost:4200) porton fut.

**Backend**

[.NET Core Runtime](https://dotnet.microsoft.com/download) telepítés után a `jegy-backend` mappában egy terminál ablakban az alábbi parancs kiadásával indítható el az adatbázis.
```
dotnet watch run
```
