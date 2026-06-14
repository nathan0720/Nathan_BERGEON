/* = CONFIGURATION = */
const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1465838008958980128/BYgFcckr5DD_TnGw3nSRC-C5P0h9qfulOZ5lX_msCKTrLvbckof1lFq51lQNNNSZyse7"; 

/* = ICONES SVG = */
const ICONS = {
    defaut: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    Ecole: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    Entreprise: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    Curieux: `<svg viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`
};

/* = LOGIQUE PRINCIPALE = */
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. GESTION DU PROFIL & UI --- */
    const profileTrigger = document.getElementById('profileTrigger');
    const modal = document.getElementById('profile-modal');
    const closeXBtn = document.getElementById('close-modal-x'); 
    const saveBtn = document.getElementById('save-profile-btn'); 
    const cards = document.querySelectorAll('.profile-card');
    const nameInput = document.getElementById('user-name-input');
    
    const storageKey = 'nathan_portfolio_user';
    let selectedType = null;
    let savedUser = JSON.parse(localStorage.getItem(storageKey));

    // Mise à jour de l'icône Header
    function updateHeaderIcon(type) {
        if(profileTrigger) {
            profileTrigger.innerHTML = ICONS[type] || ICONS['defaut'];
            if(!type || type === 'defaut') profileTrigger.classList.add('needs-setup');
            else profileTrigger.classList.remove('needs-setup');
        }
    }

    // Gestion Modal
    function openModal() { if(modal) modal.style.display = 'flex'; }
    function closeModal() { if(modal) modal.style.display = 'none'; }

    // INIT : Vérification au chargement de la page
    if (savedUser) {
        updateHeaderIcon(savedUser.type);
        selectedType = savedUser.type; 
        // Envoi notification Visite (Retour)
        sendDiscordEmbed("Visite (Retour)", "L'utilisateur revient sur le site.", savedUser, 0x3498db); // Bleu
    } else {
        updateHeaderIcon('defaut');
        setTimeout(openModal, 3000); 
        // Envoi notification Nouvelle Visite (Anonyme pour l'instant)
        sendDiscordEmbed("Nouvelle Visite", "Un visiteur non identifié parcourt le site.", {name: "Inconnu", type: "Non défini"}, 0x95a5a6); // Gris
    }

    // Click trigger Header
    if(profileTrigger) {
        profileTrigger.addEventListener('click', () => {
            openModal();
            if(savedUser) {
                if(nameInput) nameInput.value = savedUser.name || "";
                cards.forEach(c => c.classList.remove('selected'));
                const currentCard = document.querySelector(`.profile-card[data-type="${savedUser.type}"]`);
                if(currentCard) currentCard.classList.add('selected');
            }
        });
    }

    // Sélection des cartes
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.getAttribute('data-type');
        });
    });

    // Sauvegarde Profil
    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
            if(!selectedType) {
                alert("Merci de sélectionner un profil (Curieux, École ou Recruteur)");
                return;
            }
            const name = nameInput.value.trim() || "Anonyme";
            savedUser = { name: name, type: selectedType, lastVisit: new Date().toISOString() };
            localStorage.setItem(storageKey, JSON.stringify(savedUser));

            updateHeaderIcon(selectedType);
            closeModal();

            // Notification Profil Mis à jour
            sendDiscordEmbed("Profil Mis à jour", "L'utilisateur s'est identifié.", savedUser, 0x2ecc71); // Vert
        });
    }

    // Fermeture Modal
    if(closeXBtn) {
        closeXBtn.addEventListener('click', () => {
            closeModal();
            if(!savedUser && profileTrigger) profileTrigger.classList.add('needs-setup');
        });
    }
    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModal();
                if(!savedUser && profileTrigger) profileTrigger.classList.add('needs-setup');
            }
        });
    }

    /* --- 2. MACHINE A ECRIRE --- */
    const textElement = document.getElementById('typewriter-dynamic');
    const cursor = document.getElementById('cursor');
    
    if (textElement && cursor) {
        const phrases = ["une ligne à la fois."];
        let phraseIndex = 0, charIndex = 0, isDeleting = false;
        let animationStarted = false, animationTimeout;

        gsap.to(cursor, { opacity: 0, ease: "power2.inOut", repeat: -1, yoyo: true, duration: 0.5 });

        function type() {
            if (window.innerWidth <= 800) { animationStarted = false; return; }
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--; 
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++; 
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true; typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500;
            }
            animationTimeout = setTimeout(type, typeSpeed);
        }

        function checkScreenAndAnimate() {
            if (window.innerWidth <= 800) {
                clearTimeout(animationTimeout); textElement.textContent = phrases[0];
                cursor.style.display = 'none'; animationStarted = false;
            } else {
                cursor.style.display = 'inline-block';
                if (!animationStarted) {
                    charIndex = 0; isDeleting = false; animationStarted = true; type();
                }
            }
        }
        window.addEventListener('resize', checkScreenAndAnimate);
        checkScreenAndAnimate();
    }

    /* --- 3. COPIE EMAIL & LIEN --- */
    const emailBtn = document.getElementById('copyEmail');
    const shareBtn = document.getElementById('shareBtn');
    
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText("nathan07.bergeon@gmail.com").then(() => showTooltip('copyMessage'));
        });
    }
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => showTooltip('shareMessage'));
        });
    }
    function showTooltip(id) {
        const el = document.getElementById(id);
        if(el) { el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2000); }
    }
    
    /* --- 4. MENU MOBILE --- */
    const menuCheckbox = document.getElementById('menuCheckbox');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.querySelector('header');
    
    if(menuCheckbox && mobileMenu) {
        menuCheckbox.addEventListener('change', () => {
            if(menuCheckbox.checked) {
                mobileMenu.classList.add('open');
                header.classList.add('nav-active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('open');
                header.classList.remove('nav-active');
                document.body.style.overflow = '';
            }
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuCheckbox.checked = false;
                mobileMenu.classList.remove('open');
                header.classList.remove('nav-active');
                document.body.style.overflow = '';
            });
        });
    }

    /* --- 5. SUIVI CLICS PROJETS --- */
    // Détecte les clics sur les boutons "Voir le projet"
    document.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        // On vérifie si on clique sur un lien ou un bouton dans une carte
        if (projectCard && (e.target.closest('a') || e.target.tagName === 'BUTTON')) {
            const projectName = projectCard.querySelector('h3') ? projectCard.querySelector('h3').innerText : "Projet Inconnu";
            const currentUser = JSON.parse(localStorage.getItem(storageKey)) || {name: "Inconnu", type: "Non défini"};
            
            sendDiscordEmbed("Intérêt Projet", `A cliqué sur le projet : **${projectName}**`, currentUser, 0xe67e22); // Orange
        }
    });

});

/* = FONCTION ENVOI DISCORD (EMBED) = */
function sendDiscordEmbed(title, description, user, colorInt) {
    if(!DISCORD_WEBHOOK_URL.includes("discord")) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const pageTitle = document.title;

    const embed = {
        title: `📊 ${title}`,
        description: description,
        color: colorInt, // Code couleur décimal
        fields: [
            { name: "👤 Utilisateur", value: `**${user.name}**\n(${user.type})`, inline: true },
            { name: "📍 Page Actuelle", value: `${pageTitle}\n*${currentPage}*`, inline: true }
        ],
        footer: {
            text: "Portfolio Analytics • " + new Date().toLocaleTimeString('fr-FR'),
            icon_url: "https://cdn-icons-png.flaticon.com/512/25/25231.png" // Icône GitHub style
        }
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
    }).catch(e => console.error("Erreur Discord", e));
}


// page chronologie popup
document.addEventListener('DOMContentLoaded', () => {
    
    // Récupérer les éléments du popup
    const modal = document.getElementById('bulletinModal');
    const closeBtn = document.querySelector('.close-btn');
    
    // Récupérer tous les liens "sensibles" (bulletins, etc.)
    const restrictedLinks = document.querySelectorAll('.restricted-link');

    // Quand on clique sur un lien restreint, ouvrir le popup
    restrictedLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche d'ouvrir le dossier
            modal.style.display = 'block';
        });
    });

    // Quand on clique sur la croix (X), fermer le popup
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Quand l'utilisateur clique en dehors de la boîte, fermer le popup
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
