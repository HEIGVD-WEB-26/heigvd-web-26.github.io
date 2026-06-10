---
title: Labo final - Libre
css: style.css
---

## Changelog

| Date  | Changement                                                              |
|-------|-------------------------------------------------------------------------|
| 29.04 | Version initiale                                                        |
| 08.05 | Ajout d'exemples de projets et librairies et clarification de la donnée |
| 03.06 | Ajout de l'ordre de passage et délais de rendu                          |
| 05.06 | Mise à jour de l'ordre de passage                                       |
| 09.06 | Mise à jour du barème pour les présentations                            |

# Description

Lorsque vous travaillerez sur une application Web dans le futur, il est presque
certain que le projet en question nécessitera l'utilisation d'un framework,
d'une librairie, d'un API Web, ou d'autres fonctionnalités que nous n'avons pas
vues en cours, étant donné la multitude d'options et de besoins.

Dans ce laboratoire, vous allez pouvoir faire cette expérience. Nous vous
demandons de réfléchir à une application Web de votre choix, de déterminer les
besoins technologiques qu'elle nécessite, de trouver et de découvrir les
solutions existantes à ces besoins, puis de vous en servir pour implémenter
votre idée. En toute fin de semestre, nous vous demanderons ensuite de présenter
votre projet devant le reste de la classe, afin de partager vos découvertes.

Ce projet sera à réaliser par groupes de 2 à 4 personnes.

## Theme

Le thème de ce laboratoire est complètement libre. Vous pouvez commencer un
nouveau projet de zéro si vous le souhaitez, mais vous êtes également libres de
repartir du Tetris fait en cours. Pensez simplement à la charge supplémentaire que représente le
fait de repartir de zéro. (À discuter, possibilité de reprendre le projet de BDR).

La contrainte est que le projet doit représenter une charge de travail suffisante et qu'il doit utiliser des technologies non triviales (c'est-à-dire plus avancées que du simple HTML/CSS/JS). Le but est d'explorer de nouvelles technologies/librairies.
Par exemple, si vous souhaitez modifier le Tetris pour y ajouter le support pour une manette de console, il vous faudra apprendre à utiliser le [Gamepad API](https://developer.mozilla.org/en-US/docs/Games/Techniques/Controls_Gamepad_API), 
ou si vous voulez faire un Tetris en AR, vous devrez trouver une librairie vous le permettant.

Il faudra cependant vous limiter aux languages vu en classe, à savior JavaScript ou TypeScript. Donc pas de PHP ou 
Rust malheureusement. Par contre, vous êtes libres de choisir les frameworks et librairies que vous souhaitez.

## Projets des années précédentes

À titre d'inspiration, voici quelques projets réalisés par les volées
précédentes.

<details>
<summary><strong>Afficher les projets des années précédentes</strong></summary>

### Jeux multijoueurs temps réel {.unlisted}

| Projet | Description | Technologies |
|--------|-------------|------Yes--------|
| Pixel War | Jeu collaboratif inspiré de r/Place : grille de 1000×1000 pixels modifiable simultanément, avec cooldown entre chaque clic. | React, MUI, PixiJS, TypeScript, Socket.IO, Node.js |
| Jeu .io (Agar.io-like) | Chaque joueur contrôle une cellule qui absorbe particules et autres cellules plus petites en 2D. | Vue.js, TailwindCSS, Nuxt + WebSocket, Prisma, PixiJS |
| slither.io | Contrôler un serpent qui grandit en mangeant des particules sans toucher les autres. | Express, Socket.IO, Canvas |
| agar.io (variante) | Logique 100% serveur (sans précalcul client) avec leaderboard et statistiques. | Express, Socket.IO, PixiJS, Chart.js |
| Clicker HEIG | Clicker thématisé HEIG : les clics représentent des heures de révision, améliorations (labos, cours…) et chat intégré. | Node.js, PixiJS, Socket.IO, MongoDB, Faker.js, NoiseJS |
| Uno multijoueur | Uno multijoueur avec logique côté serveur, animations de cartes et ambiance sonore. | React, TypeScript, ts-audio |
| Main cerveau (échecs 2v2) | Variante d'échecs en équipes de 2 : un joueur indique la pièce, l'autre choisit le coup. | Svelte + Tailwind, Socket.IO, PeerJS, chess.js, Auth0, Prisma |
| LG-App (Loups-Garous) | Catalogue de cartes, gestionnaire de partie pour le maître du jeu, intégration Google Calendar. | React, SQLite, Google API, BigCalendar |

### Jeux solo / arcade {.unlisted}

| Projet | Description | Technologies |
|--------|-------------|--------------|
| Dinosaur Game++ | Version enrichie du jeu du dinosaure de Chrome (double saut, accroupissement, skins, mode jour/nuit). | React, TypeScript, PixiJS, React-PIXI, Jest |
| Pokédex & combats | Pokédex interactif avec système de combats Pokémon. | Bootstrap, Prisma, SQL |
| Sanicball Web | Adaptation web 3D du jeu Sanicball avec gestion de manette et leaderboard de temps. | Three.js, Auth0, Gamepad API |

### Visualisation 3D & créativité {.unlisted}

| Projet | Description | Technologies |
|--------|-------------|--------------|
| HEIG Room Finder | Trouver les salles libres de la HEIG sur un créneau donné, via un modèle 3D interactif du bâtiment. | Three.js, React, ical.js, neverthrow |
| AI 3D Gallery | Galerie d'images en 3D avec génération de poèmes par IA et navigation à la manette. | React, React Three Fiber, AI API, ORM, Gamepad API |

### Outils & utilitaires {.unlisted}

| Projet | Description | Technologies |
|--------|-------------|--------------|
| Analyse d'URL | Analyse passive d'URL (HTTP, Whois, DNS, SSL, VirusTotal) inspirée de Cloudflare Radar. | Vue.js + Axios, Ruby on Rails (API REST), JWT, Rust |
| Spawn-It | Déploiement en un clic de serveurs (Minecraft, QuakeJS, WordPress…) sur Docker/AWS/Azure, suivi en direct via SSE. | Next.js + React, MUI, Express, JWT |
| Lecteur RSS auto-hébergé | Lecteur de flux RSS avec gestion par catégories, marquage lu/non-lu, favoris et recherche. | React, Express.js, rss-parser, Prisma + SQLite, DaisyUI + TailwindCSS |

### Apps collaboratives / communautaires {.unlisted}

| Projet | Description | Technologies |
|--------|-------------|--------------|
| Diaporama collaboratif | Soumission de photos via OAuth Google, validation par un admin, puis affichage sur grand écran avec mise à jour temps réel. | Express.js, Long-polling, OAuth Google, Bootstrap |
| Bibliothèque de jeux libres | Catalogue avec stats globales, filtres, favoris et statistiques par utilisateur. | React, SQLite, Passport, Chart.js |

</details>

## Idées de librairies et APIs Web à explorer

Voici une liste non-exhaustive de technologies que vous pouvez explorer pour
votre projet. N'hésitez pas à en proposer d'autres !

<details>
<summary><strong>Afficher les librairies et APIs Web</strong></summary>

### Rendu graphique & jeux {.unlisted}

- [PixiJS](https://pixijs.com/) — moteur 2D WebGL très performant, idéal pour des jeux ou de la dataviz à grande échelle.
- [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/) — rendu 3D dans le navigateur (jeux, scènes interactives, visualisations).
- [Phaser](https://phaser.io/) — framework de jeux 2D complet (physique, animations, tilemaps).
- [Babylon.js](https://www.babylonjs.com/) — alternative à Three.js pour la 3D, orientée jeux.
- [p5.js](https://p5js.org/) — créatif/génératif, parfait pour des projets artistiques.

### Communication temps réel {.unlisted}

- [Socket.IO](https://socket.io/) — la référence pour la communication bidirectionnelle temps réel.
- [WebSocket natif](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) — l'API standard, sans dépendance.
- [PeerJS](https://peerjs.com/) — communication peer-to-peer via WebRTC (chat vidéo, partage de fichiers).
- [Server-Sent Events (SSE)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) — flux unidirectionnel serveur → client (notifications, suivi de progression).

### Backend Node.js {.unlisted}

- [Express](https://expressjs.com/) — le framework HTTP minimaliste classique.
- [Fastify](https://fastify.dev/) — alternative moderne à Express, plus rapide et avec validation intégrée.
- [NestJS](https://nestjs.com/) — framework structuré (style Angular) pour applications plus larges.
- [Hono](https://hono.dev/) — framework ultra-léger qui tourne aussi sur le edge (Cloudflare Workers, Bun, Deno).

### Bases de données & ORM {.unlisted}

- [Prisma](https://www.prisma.io/) — ORM TypeScript avec migrations, type safety et excellente DX.
- [Drizzle](https://orm.drizzle.team/) — ORM léger et type-safe, plus proche du SQL.
- [TypeORM](https://typeorm.io/) — ORM pour TypeScript/JavaScript inspiré de Hibernate.
- [Mongoose](https://mongoosejs.com/) — modélisation et validation pour MongoDB.
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — SQLite synchrone en Node.js, parfait pour les projets auto-hébergés.
- [Redis (ioredis)](https://github.com/redis/ioredis) — cache, pub/sub, files d'attente.

### Cartographie & géolocalisation {.unlisted}

- [Leaflet](https://leafletjs.com/) — cartes interactives légères.
- [MapLibre GL](https://maplibre.org/) — cartes vectorielles WebGL (alternative open-source à Mapbox).
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) — accéder à la position de l'utilisateur.

### Visualisation de données {.unlisted}

- [D3.js](https://d3js.org/) — visualisations data sur-mesure.
- [Chart.js](https://www.chartjs.org/) / [Recharts](https://recharts.org/) — graphiques prêts à l'emploi.
- [Plotly.js](https://plotly.com/javascript/) — graphiques scientifiques interactifs.
- [Observable Plot](https://observablehq.com/plot/) — API concise pour des graphiques rapides.

### Médias, audio & XR {.unlisted}

- [Tone.js](https://tonejs.github.io/) — synthèse et séquençage audio.
- [Howler.js](https://howlerjs.com/) — lecture audio simplifiée.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) — manipulation audio bas niveau (visualiseurs, effets).
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — reconnaissance et synthèse vocale.
- [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) — vidéo/audio en temps réel.
- [A-Frame](https://aframe.io/) / [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) — VR/AR dans le navigateur.

### Interaction & périphériques {.unlisted}

- [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API) — support des manettes de console.
- [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) — gestes tactiles, stylet, souris unifiés.
- [Web Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) / [Web USB](https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API) — connexion à du matériel.
- [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) — communication avec des microcontrôleurs (Arduino…).

### Authentification {.unlisted}

- [Auth0](https://auth0.com/) / [Clerk](https://clerk.com/) — solutions d'authentification clés en main.
- [Lucia](https://lucia-auth.com/) — librairie d'auth flexible en TypeScript.
- [Passport.js](https://www.passportjs.org/) — stratégies d'authentification (OAuth, JWT, local…).
- [WebAuthn](https://webauthn.io/) — authentification sans mot de passe (passkeys, biométrie).

### UI & frameworks {.unlisted}

- [React](https://react.dev/), [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/), [SolidJS](https://www.solidjs.com/) — frameworks frontend.
- [Next.js](https://nextjs.org/), [Nuxt](https://nuxt.com/), [SvelteKit](https://kit.svelte.dev/), [Astro](https://astro.build/) — méta-frameworks SSR.
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) / [DaisyUI](https://daisyui.com/) / [MUI](https://mui.com/) — design systems rapides.
- [Framer Motion](https://www.framer.com/motion/) / [GSAP](https://gsap.com/) — animations.

### Librairies utilitaires & spécialisées {.unlisted}

- [chess.js](https://github.com/jhlywa/chess.js) — logique de jeu d'échecs (validation des coups, FEN, PGN).
- [rss-parser](https://github.com/rbren/rss-parser) — parsing de flux RSS/Atom.
- [ical.js](https://github.com/kewisch/ical.js) — lecture/écriture de fichiers iCalendar.
- [Faker.js](https://fakerjs.dev/) — génération de données fictives (utilisateurs, textes, dates…).
- [Zod](https://zod.dev/) — validation de schémas TypeScript.
- [date-fns](https://date-fns.org/) / [Day.js](https://day.js.org/) — manipulation de dates.
- [neverthrow](https://github.com/supermacro/neverthrow) — gestion d'erreurs typée (`Result<T, E>`).
- [Zustand](https://zustand-demo.pmnd.rs/) / [Pinia](https://pinia.vuejs.org/) — gestion d'état frontend.

</details>

# Timeline

La timeline sera la suivante.

-  **Fin des périodes de labo de la semaine du 13 mai** : Rendu des
   informations de votre équipe ainsi que les fonctionnalités que vous allez
   proposer. A fournir ici [Ici](https://hessoit-my.sharepoint.com/:x:/g/personal/olivier_tischhau_hes-so_ch/IQDKqkogRJ9NR4VVXnGHMOR0Ae2PK1hXWaebOlTirLsUOX8?e=Qi9R8c).
  - Nous demandons également de nous fournir un cahier des charges par email. 
    Un [template de cahier des charges](cahier-des-charges-template.md) est à votre disposition.
  - Le scope du projet doit refléter la taille de l'équipe. Un ordre d'idée est
    d'avoir une fonctionnalité majeure / technologie par personne. (par exemple, une application en
    React, affichant des graphiques interactifs, et une carte dynamique avec
    Leaflet pourrait être un projet pour 3 personnes).
- Nous validerons ensuite votre idée, si celle-ci nous semble représenter une
  charge de travail réaliste et suffisante. N'hésitez pas non plus à
    discuter avec nous de votre idée avant de la soumettre, si vous avez des
    doutes.

- **Semaine du 10 juin** : Rendu et présentation de votre projet. Vous devrez
  avoir terminé l’implémentation des améliorations que vous avez proposées, et
  être prêts à les présenter.

Nous vous encourageons vivement à venir nous voir régulièrement pour discuter de
l'avancement de votre projet.

## Délais de rendu des projets et des présentations
### Groupes qui présentent mercredi 10.06
Mercredi 10 juin à 14h30

### Groupes qui présentent vendredi 12.06
Vendredi 12 juin à 13h00

# Présentation finale

## Ordre de passage

L'ordre de passage est donné ci-dessous, avec les horaires que nous souhaitons respecter.

Toutes les équipes doivent assister aux pr  ésentations des autres équipes, afin de découvrir les projets des autres et d'apprendre de nouvelles choses.

Un intervalle de **2 minutes** est prévu entre deux passages pour l'installation.

L'horaire de fin indiqué correspond à la durée **maximale** autorisée pour la
taille de l'équipe. Merci de respecter les durées minimales et maximales prévues pour la taille de votre équipe.

### Mercredi 10.09 (assistant : STV) — début à 14h30

| Nb personnes | Équipe                          | Projet               | Temps      | Heure de passage |
|--------------|---------------------------------|----------------------|------------|------------------|
| 2            | Thomas, Charles                 | whoiselected         | 10-15 min  | 14h30 – 14h45    |
| 1            | Michael                         | NetRecon             | 8-13 min   | 14h47 – 15h00    |
| 2            | Dylan, Guo Yu                   | Pirates CSG 3D       | 10-15 min  | 15h02 – 15h17    |
| 1            | Maksym                          | Better flashcards    | 8-13 min   | 15h19 – 15h32    |
| 4            | Aymeric, Tadeusz, Jules, Yanni  | Tchoutchou transport | 14-19 min  | 15h34 – 15h53    |
| 4            | Louis, Quentin, Simão, Colin    | Möbelhem             | 14-19 min  | 15h55 – 16h14    |
| 2            | Koray, Jonatan                  | Racing               | 10-15 min  | 16h16 – 16h31    |

### Vendredi 12.09 (assistante : CFN) — début à 13h00

| Nb personnes | Équipe                          | Projet                | Temps      | Heure de passage |
|--------------|---------------------------------|-----------------------|------------|------------------|
| 3            | Sofian, Mirco, François         | feuille caillou ciseau| 12-17 min  | 13h00 – 13h17    |
| 4            | Yann, Léo, Mauro, Julien        | Space Invader         | 14-19 min  | 13h19 – 13h38    |
| 3            | Pierre, Maikol, Nolan           | Space Dashboard       | 12-17 min  | 13h40 – 13h57    |
| 3            | Theo, Maxime, Santiago          | Build and Jump        | 12-17 min  | 13h59 – 14h16    |


## Durée de votre présentation

Vos présentations ne devront **strictement** pas dépasser les durées maximales suivantes,
en fonction de la taille de votre équipe. Ce choix est justifié par le fait
qu’une plus grande équipe aura travaillé sur plus de choses et aura donc plus de
contenu à présenter.

| Taille de l'équipe | Durée de la présentation (min-max) |
| ------------------ | ---------------------------------- |
| 1                  | 8-13 minutes                       |
| 2                  | 10-15 minutes                      |
| 3                  | 12-17 minutes                      |
| 4                  | 14-19 minutes                      |

# Évaluation (à confirmer)

Vous serez évalués sur les critères suivants.

<!--
Critères de notation:

- 0 point - Le critère n'est pas respecté
- 1 point - Le critère est partiellement respecté
- 2 points - Le critère est respecté
-->

## Présentation (9pts)
- Répartition du temps de parole (1pt): <br/>
  il est important que chaque personne participe de manière égale.

- Respect du temps imparti (1pt) : <br/>
  vous avez un temps de parole défini, et il est important que vous le respectiez.

- Retour sur les technologies (3pts): <br/>
  vous devez présenter les librairies ou APIs que vous avez utilisées, et expliquer pourquoi vous les avez choisies, ce que vous avez appris, les avantages et inconvénients de chaque technologie. Apprenez-nous des choses !

- Demo (3pts): <br />
  vous devez faire une démonstration fonctionnelle de votre solution.

- Réponse aux questions (1pt): <br />
  votre équipe doit être prête à répondre aux questions.

## Code (16pts)
- Respect des délais et répartition du travail sur la durée (2pts): <br />
  Vous devez rendre votre projet à temps, et avoir réparti le travail sur tout le temps imparti.

- Documentation et prise en main (3pts): <br />
  Votre projet doit être facile à prendre en main pour une personne qui n'a pas travaillé dessus et doit fonctionner sur une autre machine que celle de la démonstration. Vous devez donc indiquer dans le `README.md` (ou autre fichier) comment installer et lancer votre projet.

- Le projet fonctionne (3pts): <br />
  Votre projet est fonctionnel et ne contient pas de bugs majeurs.

- Bonnes pratiques & utilisation des technologies (3pts): <br />
  Qualité du code et bonnes pratiques recommandées par les technologies que vous avez utilisées ainsi que le bon usage des technologies.

- Respect du cahier des charges (5pts): <br />
  Vous devez respecter votre cahier des charges.

# Répartition du travail entre membres

En cas de répartition inégale du travail entre les membres de l’équipe, une pénalité pour les membres qui ont participé sensiblement moins que les autres pourrait être appliquée.

Nous nous baserons sur les commits de l’historique Git pour nous faire une idée de la répartition. Si vous avez travaillé en “Peer Programming”, ou en cas de doute, vous pouvez aussi spécifier la contribution de chaque membre dans le README.md de votre projet.


