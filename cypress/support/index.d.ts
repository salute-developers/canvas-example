/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Переход на '/' и проверка наличия window.AssistantClient.
         */
        start(v: void): void;
    }
}
