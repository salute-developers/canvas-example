Cypress.Commands.add('start', () => {
    cy.on('window:before:load', (win) => {
        [
            'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css',
            'https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansDisplay.0.1.0.css',
        ].forEach((href) => {
            if (win.document.querySelector(`[href='${href}']`)) {
                return;
            }

            const link = win.document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', href);
            win.document.head.appendChild(link);
        });
    });

    cy.visit('/').window().its('AssistantClient');
});
