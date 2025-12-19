// pour le menu deroulant page Nathan BERGEON

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// Logique du bouton copier (multiples boutons)
document.addEventListener('DOMContentLoaded', () => {
    // 1. On sélectionne TOUS les boutons qui ont la classe .copy-btn
    const buttons = document.querySelectorAll('.copy-btn');

    // 2. On boucle sur chaque bouton pour leur ajouter l'événement
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            
            // On récupère l'ID du code cible via l'attribut data-target du bouton
            const targetId = button.getAttribute('data-target');
            const codeBlock = document.getElementById(targetId);

            if (codeBlock) {
                // Récupérer le texte
                const codeText = codeBlock.textContent.trim();

                // Copier dans le presse-papier
                navigator.clipboard.writeText(codeText)
                    .then(() => {
                        // Animation de succès spécifique au bouton cliqué
                        const originalHTML = button.innerHTML;
                        button.classList.add('copied');
                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Copié !';
                        
                        // Réinitialisation après 2 secondes
                        setTimeout(() => {
                            button.classList.remove('copied');
                            button.innerHTML = originalHTML;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Erreur copie: ', err);
                        alert("La copie a échoué. Votre navigateur ne supporte peut-être pas cette fonctionnalité.");
                    });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typewriter-dynamic');
    const cursor = document.getElementById('cursor');
    
    const phrases = ["une ligne à la fois."]; // Tu peux mettre plusieurs phrases
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Animation du curseur avec GSAP
    gsap.to(cursor, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.5
    });

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // On efface
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Plus rapide quand on efface
        } else {
            // On écrit
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Gestion des pauses et changements de phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause à la fin de la phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause avant de recommencer
        }

        setTimeout(type, typingSpeed);
    }

    // Lancer l'animation
    setTimeout(type, 1000); 
});