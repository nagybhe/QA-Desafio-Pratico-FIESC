module.exports = {
  // Diretório raiz (um nível acima para acessar backend e frontend)
  rootDir: '../',
  
  // Onde encontrar os testes
  testMatch: [
    '<rootDir>/unitarios/**/*.test.js',
    '<rootDir>/integracao/**/*.test.js'
  ],
  
  // Configuração específica para diferentes tipos de teste
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/unitarios/backend/**/*.test.js',
        '<rootDir>/unitarios/integracao/api/**/*.test.js'
      ],
      transform: {
        '^.+\\.js$': 'babel-jest'
      }
      // REMOVA testTimeout daqui - não é permitido dentro de projects
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/unitarios/frontend/**/*.test.js'],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      },
      transformIgnorePatterns: [
        '/node_modules/'
      ],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      },
     setupFilesAfterEnv: ['/media/nagybhehage/Windows/Gestão de Projetos/Projetos de Node.js/QA-Desafio-Pratico-FIESC/testes/setup.js'],
     moduleDirectories: ['node_modules']
     // REMOVA testTimeout daqui - não é permitido dentro de projects
    }
  ],
  
  // Cobertura de código
  collectCoverage: true,
  coverageDirectory: '<rootDir>/testes/reports/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'backend/src/**/*.js',
    'frontend/src/**/*.js',
    '!backend/src/**/index.js',
    '!**/node_modules/**',
    '!**/migrations/**'
  ],
  
  // Timeout para testes assíncronos (global - funciona)
  testTimeout: 60000, // <-- AUMENTADO PARA 60 SEGUNDOS (AQUI FUNCIONA)
  
  // Verbosidade
  verbose: true,
  
  // Limpar mocks entre testes
  clearMocks: true,
  
  // Módulos a serem ignorados
  modulePathIgnorePatterns: [
    '<rootDir>/frontend/node_modules',
    '<rootDir>/backend/node_modules'
  ],
  
  // Mapeamento de módulos (para imports)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};