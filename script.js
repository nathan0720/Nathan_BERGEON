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