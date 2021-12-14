export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  roots: ["<rootDir>/__test__"],
  testMatch: ["**/test/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@exceptions/(.*)": "<rootDir>/src/exceptions/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@repositories/(.*)": "<rootDir>/src/repositories/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
  },
};
