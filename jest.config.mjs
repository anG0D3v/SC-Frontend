import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['./app/utils/*', './cypress/*', './node_modules/*'],
};

export default createJestConfig(config);
