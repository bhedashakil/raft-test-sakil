module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/modules/**/*.controller.ts', 'src/modules/**/*.service.ts', 'src/modules/**/*.dao.ts', 'src/helpers/**.ts'],
    coverageThreshold: {
        global: { lines: 50, functions: 50, branches: 50, statements: 50 }
    },
    preset: 'ts-jest',
    testPathIgnorePatterns: [
        'node_modules',
    ]
}