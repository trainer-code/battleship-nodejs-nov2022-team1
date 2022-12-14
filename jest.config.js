module.exports = {
    preset: 'ts-jest',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: [
        "node_modules",
        "test-config",
        "interfaces",
        "jestGlobalMocks.ts",
        "testing.*.ts",
        ".enum.ts",
        "models",
        "<rootDir>/src/themes",
        ".module.ts",
        ".css.ts",
        "<rootDir>/src/index.tsx",
        ".mock.ts",
        "<rootDir>/src/serviceWorker.ts",
        "mocks"
    ],
    "coverageThreshold": {
        "global": {
          "branches": 1,
          "functions": 5,
          "lines": 5,
          "statements": 5
        }
      },
      "coverageReporters": [
        "text",
        "html",
        "lcov"
      ]
};