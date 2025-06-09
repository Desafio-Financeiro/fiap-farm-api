import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'fiap-farm-api',
      version: '1.0.0',
      description: 'Documentação da API FIAP Farm',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            uid: { type: 'string', example: 'abc123' },
            name: { type: 'string', example: 'Milho' },
            description: { type: 'string', example: 'Milho verde orgânico' },
            unit: { type: 'string', example: 'kg' },
            averageProductionDays: { type: 'number', example: 90 },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-09T12:00:00Z' },
          },
          required: ['name', 'description', 'unit', 'averageProductionDays'],
        },
        Sale: {
          type: 'object',
          properties: {
            uid: { type: 'string', example: 'sale123' },
            productId: { type: 'string', example: 'abc123' },
            quantity: { type: 'number', example: 10 },
            total: { type: 'number', example: 105 },
            date: { type: 'string', format: 'date-time', example: '2025-06-09T12:00:00Z' },
          },
          required: ['productId', 'quantity', 'total', 'date'],
        },
        Production: {
          type: 'object',
          properties: {
            uid: { type: 'string', example: 'prod123' },
            productId: { type: 'string', example: 'abc123' },
            area: { type: 'number', example: 10 },
            quantityExpected: { type: 'number', example: 1000 },
            quantityHarvested: { type: 'number', example: 950 },
            status: {
              type: 'string',
              enum: ['WAITING', 'IN_PROGRESS', 'HARVESTED'],
              example: 'IN_PROGRESS',
            },
            plantingDate: { type: 'string', format: 'date-time', example: '2025-03-01T00:00:00Z' },
            harvestDate: { type: 'string', format: 'date-time', example: '2025-06-01T00:00:00Z' },
            userId: { type: 'number', example: 1 },
            createdAt: { type: 'string', format: 'date-time', example: '2025-02-01T00:00:00Z' },
          },
          required: ['productId', 'area', 'quantityExpected', 'status', 'plantingDate', 'userId'],
        },
        InventoryMovement: {
          type: 'object',
          properties: {
            uid: { type: 'string', example: 'inv123' },
            productId: { type: 'string', example: 'abc123' },
            type: {
              type: 'string',
              enum: ['ENTRY', 'EXIT'],
              example: 'ENTRY',
            },
            quantity: { type: 'number', example: 20 },
            source: {
              type: 'string',
              enum: ['SALE', 'PRODUCTION'],
              example: 'SALE',
            },
            referenceId: { type: 'string', example: 'sale123' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-09T12:00:00Z' },
          },
          required: ['productId', 'type', 'quantity', 'source', 'referenceId'],
        },
        Goal: {
          type: 'object',
          properties: {
            uid: { type: 'string', example: 'goal123' },
            productId: { type: 'string', example: 'abc123' },
            type: {
              type: 'string',
              enum: ['SALE', 'PRODUCTION'],
              example: 'SALE',
            },
            quantityTarget: { type: 'number', example: 1000 },
            startDate: { type: 'string', format: 'date-time', example: '2025-06-01T00:00:00Z' },
            endDate: { type: 'string', format: 'date-time', example: '2025-12-01T00:00:00Z' },
            userId: { type: 'string', example: 'user123' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-09T12:00:00Z' },
          },
          required: ['productId', 'type', 'quantityTarget', 'startDate', 'endDate', 'userId'],
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/interfaces/http/routes/*.ts'], // Caminho dos arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
