const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
});

module.exports = defineConfig({
    projectId: '734ahm',
    video: true,
    screenshotOnRunFailure: true,
    env: {
        'cypress-react-selector': {
            root: '#root',
        },
    },
    e2e: {
        setupNodeEvents(on, config) {
            config.env = {
                ...process.env,
                ...config.env,
            };
            return config;
        },
        specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
        excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    },
    component: {
        setupNodeEvents(on, config) {
            config.env = {
                ...process.env,
                ...config.env,
            };
            return config;
        },
        specPattern: 'cypress/components/**/*.cy.{js,ts,jsx,tsx}',
        excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
});
