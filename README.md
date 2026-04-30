# 🚀 Portfolio de Développement : Réseaux, Robotique & Algorithmique

Bienvenue sur mon portfolio ! Ce dépôt regroupe mes travaux réalisés autour de trois axes majeurs : la simulation réseau, la programmation système (Micro:bit) et l'algorithmique visuelle (Turtle).

---

## 🌐 1. Architecture & Protocoles Réseaux (Simulation Filius)
Ce volet présente ma compréhension des couches du modèle OSI et de la communication client-serveur.

*   **Gestion de l'adressage IP** : Configuration d'adresses Internet Protocol pour l'identification des machines[cite: 29].
*   **Protocoles de transport et liaison** : Utilisation de TCP pour une transmission fiable des données et ARP pour lier les adresses IP aux adresses MAC physiques[cite: 29].
*   **Services Internet** : Mise en place de serveurs DNS pour la résolution de noms de domaine et analyse des protocoles de messagerie SMTP/POP3[cite: 29, 31].
*   **Diagnostic Réseau** : Maîtrise des outils ICMP (Ping) pour tester la connectivité entre les nœuds d'un réseau[cite: 29].

---

## 🤖 2. Robotique & Systèmes Embarqués (Micro:bit Maqueen)
Développement de programmes en **MicroPython** pour le robot Maqueen, exploitant l'interaction entre le code et les capteurs physiques.

*   **Communication I2C** : Pilotage des moteurs via l'adresse hexadécimale `0x10` pour avancer, reculer et tourner[cite: 32, 33].
*   **Navigation Autonome (Suiveur de ligne)** : Utilisation des capteurs infrarouges sur les broches `pin13` et `pin14` pour le suivi de tracé[cite: 32].
*   **Évitement d'obstacles** : Mesure de distance par ultrasons (formule : $delai \times 34 / 2000$) et signalisation visuelle par LEDs Neopixel[cite: 33, 34].
*   **Communication Radio** : Pilotage à distance via le module radio (canal 12) utilisant l'accéléromètre et les boutons de la micro:bit[cite: 34, 35].

---

## 🎨 3. Algorithmique Visuelle & Mathématiques (Turtle Python)
Une collection de scripts illustrant la maîtrise de la logique de programmation à travers la bibliothèque graphique Turtle.

*   **Géométrie appliquée (`oeuf.py`)** : Utilisation du théorème de Pythagore pour tracer des courbes parfaites[cite: 38].
*   **Logique de contrôle (`Echéquier.py`)** : Implémentation de boucles imbriquées et de tests de parité pour générer une grille complexe[cite: 44].
*   **Dessins de structures** : Création de maisons, d'octogones et de polygones réguliers basés sur les entrées utilisateurs[cite: 36, 37, 39].
*   **Spirales algorithmiques** : Développement de spirales dont la taille évolue de façon incrémentielle via des boucles `while`[cite: 41, 42].

---

## 🛠️ Compétences Techniques
*   **Langages** : Python, MicroPython[cite: 32, 41].
*   **Matériel** : Micro:bit, Robot Maqueen, Capteurs ultrasons/infrarouges[cite: 32, 33].
*   **Protocoles** : TCP/IP, DNS, I2C, Radio, ARP, ICMP[cite: 29, 32, 34].
*   **Logiciels** : Filius (Architecture réseau), Turtle (Visualisation)[cite: 29, 36].

---

## 📂 Arborescence du Projet
```text
.
├── index.html                 # Page d'accueil du portfolio
├── projets.html               # Galerie des réalisations
├── turtel.html                # Section dédiée aux scripts Turtle
├── Microbit.html              # Section dédiée à la robotique
├── filius.html                # Section dédiée aux réseaux
├── chronologie.html           # Parcours académique
├── contact.html               # Formulaire de contact
├── style.css                  # Design et mise en page (CSS)
├── script.js                  # Interactivité du site (JS)
│
├── 🎓 Bulletins/              # Dossier des bulletins scolaires (2022-2026)
│   ├── Second_2022-2023
│   ├── Premiere_2023-2024
│   ├── Premier2_2024-2025
│   └── Terminal_2025-2026
│
├── 🖼️ images/                 # Ressources visuelles du site
│   ├── logo_microbit_maqueen.jpg
│   ├── logo_turtel.jpg
│   └── Turtel/                # Captures d'écran des rendus Turtle
│       ├── Echiquier.jpg
│       └── Oeuf.jpg
│
└── 📁 Projets/                # Fichiers sources et archives
    ├── Microbit.zip           # Archive complète des codes Micro:bit[cite: 47]
    ├── Turtel.zip             # Archive complète des scripts Turtle[cite: 46]
    ├── Filius/                # Simulations .fls et analyses PDF[cite: 29]
    ├── Microbit/              # Codes sources Python par projet[cite: 32, 34]
    └── Turtel/                # Codes sources Python Turtle[cite: 36, 44]
```
*Portfolio réalisé par Nathan BERGEON. N'hésitez pas à parcourir le code pour découvrir les implémentations détaillées.*
