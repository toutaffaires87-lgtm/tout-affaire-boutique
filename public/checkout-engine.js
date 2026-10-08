/**
 * Checkout Engine - Module Frontend Monoproduit
 */
console.log('⚡ Checkout Engine initialisé');

window.CheckoutEngine = {
    init: function() {
        console.log('Moteur de checkout prêt pour TOUT-AFFAIRE');
    },
    
    validateForm: function(formData) {
        if (!formData.customer.firstName || !formData.customer.lastName) {
            return { valid: false, message: 'Veuillez saisir votre prénom et votre nom.' };
        }
        if (!formData.customer.email || !formData.customer.email.includes('@')) {
            return { valid: false, message: 'Veuillez saisir un e-mail valide.' };
        }
        if (!formData.customer.address || !formData.customer.postalCode || !formData.customer.city) {
            return { valid: false, message: 'Veuillez compléter votre adresse de livraison.' };
        }
        return { valid: true };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.CheckoutEngine.init();
});
