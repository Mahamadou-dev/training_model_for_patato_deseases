export const Plants = [
    {
        id: 'potato',
        name: 'Pomme de Terre 🥔',
        // High quality potato plant image
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        modelAvailable: true,
        description: "Culture racine majeure, sensible aux maladies fongiques comme le mildiou (phytophtora) et l'alternariose.",
        diseases: [
            {
                name: 'Mildiou (Late Blight)',
                symptoms: 'Larges taches brunes irrégulières sur les feuilles, souvent avec un duvet blanc en périphérie par temps humide.',
                treatment: 'Application préventive de fongicides, destruction des fanes infectées, utilisation de variétés résistantes.',
            },
            {
                name: 'Alternariose (Early Blight)',
                symptoms: 'Petites taches brunes concentriques (cibles) sur les feuilles âgées, jaunissement autour des taches.',
                treatment: 'Rotation des cultures sur 3 ans, irrigation correcte sans mouiller le feuillage, fongicides à base de cuivre.',
            },
        ],
    },
    {
        id: 'tomato',
        name: 'Tomate 🍅',
        // High quality tomato plant image
        image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        modelAvailable: false,
        description: "Le fruit légume le plus consommé, victime fréquente de champignons, virus et bactérioses sous climat chaud.",
        diseases: [
            {
                name: 'Modèle en construction',
                symptoms: 'Les données pour la tomate sont en cours de collecte.',
                treatment: 'Revenez bientôt pour une analyse complète.',
            },
        ],
    },
    {
        id: 'corn',
        name: 'Maïs 🌽',
        // High quality corn plant image
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        modelAvailable: false,
        description: "Céréale vitale pour l'alimentation, menacée par la chenille légionnaire et la striure du maïs.",
        diseases: [],
    },
    {
        id: 'pepper',
        name: 'Piment 🌶️',
        // Pepper plant image
        image: 'https://images.unsplash.com/photo-1563829094-1a51240f9b3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        modelAvailable: false,
        description: "Culture de rente importante, sensible aux viroses et à l'anthracnose.",
        diseases: [],
    },
];
