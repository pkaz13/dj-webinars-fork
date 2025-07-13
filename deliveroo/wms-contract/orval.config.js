module.exports = {
  api: {
    input: {
      target: './wms.contract.yml', // Path to your OpenAPI contract
    },
    output: {
      mode: 'tags-split', // Generates separate files for endpoints and schemas
      target: './output/ts/api.ts', // Main API file
      schemas: './output/ts/contract', // Directory for generated types/interfaces
      clientName: 'APIService',
      mock: true, // Set to true if you want mock handlers generated
      prettier: true, // Optionally format output with Prettier
      client: 'angular', // Use fetch as the HTTP client
      // client: 'fetch', // Use fetch as the HTTP client
      baseUrl: 'http://localhost:8080/wms/api',
    },
  },
}; 