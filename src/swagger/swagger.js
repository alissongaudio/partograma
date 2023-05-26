const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Partograma API',
        version: '1.0.0',
        description: 'Partograma API documentation'
      },
      servers: [
        {
          url: 'http://localhost:3000'
        }
      ],
      paths: {
        '/amostraSangueFetal': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/AmostraSangueFetal"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/AmostraSangueFetalPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/AmostraSangueFetal"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/AmostraSangueFetalPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/AmostraSangueFetal"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/amostraSangueFetal/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/AmostraSangueFetalPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/apgars': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Apgars"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/ApgarsPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Apgars"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/ApgarsPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Apgars"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/apgars/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/ApgarsPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/companhia': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Companhia"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/CompanhiaPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Companhia"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/CompanhiaPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Companhia"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/companhia/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/CompanhiaPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/contracoes': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Contracoes"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/ContracoesPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Contracoes"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/ContracoesPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Contracoes"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/contracoes/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/ContracoesPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom1': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom1"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom1Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom1"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom1Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom1/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom1PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom2': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom2"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom2Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom2"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom2Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom2"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom2/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom2PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom3': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom3"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom3Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom3"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom3Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom3"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom3/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom3PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom4': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom4"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom4Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom4"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom4Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom4"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom4/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom4PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom5': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom5"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom5Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom5"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom5Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom5"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom5/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom5PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom6': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom6"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom6Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom6"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom6Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom6"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom6/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom6PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/custom7': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom7"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom7Post"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom7"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom7Put"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Custom7"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/custom7/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/Custom7PutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/dataHoraParto': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DataHoraParto"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DataHoraPartoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DataHoraParto"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DataHoraPartoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DataHoraParto"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/dataHoraParto/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DataHoraPartoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/dataHoraPlacenta': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DataHoraPlacenta"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DataHoraPlacentaPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DataHoraPlacenta"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DataHoraPlacentaPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DataHoraPlacenta"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/dataHoraPlacenta/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DataHoraPlacentaPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/dequitacao': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Dequitacao"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DequitacaoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Dequitacao"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DequitacaoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Dequitacao"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/dequitacao/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DequitacaoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/dilatacaoCervical': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DilatacaoCervical"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DilatacaoCervicalPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DilatacaoCervical"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DilatacaoCervicalPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/DilatacaoCervical"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/dilatacaoCervical/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/DilatacaoCervicalPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/farmacologico': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Farmacologico"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/FarmacologicoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Farmacologico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/FarmacologicoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Farmacologico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/farmacologico/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/FarmacologicoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/historicoObstetrico': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/HistoricoObstetrico"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/HistoricoObstetricoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/HistoricoObstetrico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/HistoricoObstetricoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/HistoricoObstetrico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/historicoObstetrico/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/HistoricoObstetricoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/idadeGestacional': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/IdadeGestacional"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/IdadeGestacionalPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/IdadeGestacional"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/IdadeGestacionalPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/IdadeGestacional"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/idadeGestacional/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/IdadeGestacionalPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/ingestaoLiquido': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/IngestaoLiquido"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/IngestaoLiquidoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/IngestaoLiquido"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/IngestaoLiquidoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/IngestaoLiquido"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/ingestaoLiquido/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/IngestaoLiquidoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/inicioTrabalhoParto': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/InicioTrabalhoParto"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/InicioTrabalhoPartoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/InicioTrabalhoParto"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/InicioTrabalhoPartoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/InicioTrabalhoParto"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/inicioTrabalhoParto/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/InicioTrabalhoPartoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/liquidoAmniotico': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/LiquidoAmniotico"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/LiquidoAmnioticoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/LiquidoAmniotico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/LiquidoAmnioticoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/LiquidoAmniotico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/liquidoAmniotico/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/LiquidoAmnioticoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/monitoramentoCardiacoBebe': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/MonitoramentoCardiacoBebe"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/MonitoramentoCardiacoBebePost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/MonitoramentoCardiacoBebe"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/MonitoramentoCardiacoBebePut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/MonitoramentoCardiacoBebe"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/monitoramentoCardiacoBebe/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/MonitoramentoCardiacoBebePutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/monitoramentoCardiacoPaciente': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/MonitoramentoCardiacoPaciente"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/MonitoramentoCardiacoPacientePost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/MonitoramentoCardiacoPaciente"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/MonitoramentoCardiacoPacientePut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/MonitoramentoCardiacoPaciente"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/monitoramentoCardiacoPaciente/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/MonitoramentoCardiacoPacientePutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/naoFarmacologico': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/NaoFarmacologico"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NaoFarmacologicoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/NaoFarmacologico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NaoFarmacologicoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/NaoFarmacologico"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/naoFarmacologico/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NaoFarmacologicoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/nascimento': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Nascimento"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NascimentoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Nascimento"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NascimentoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Nascimento"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/nascimento/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NascimentoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/notasClinicas': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/NotasClinicas"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NotasClinicasPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/NotasClinicas"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NotasClinicasPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/NotasClinicas"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/notasClinicas/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/NotasClinicasPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/ocitocina': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Ocitocina"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/OcitocinaPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Ocitocina"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/OcitocinaPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Ocitocina"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/ocitocina/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/OcitocinaPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/paciente': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Paciente"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PacientePost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Paciente"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PacientePut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Paciente"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/paciente/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PacientePutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/partograma': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Partograma"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PartogramaPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Partograma"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PartogramaPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Partograma"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        '/planoCuidado': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/PlanoCuidado"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PlanoCuidadoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/PlanoCuidado"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PlanoCuidadoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/PlanoCuidado"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/planoCuidado/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PlanoCuidadoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/posicaoFetal': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/PosicaoFetal"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PosicaoFetalPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/PosicaoFetal"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PosicaoFetalPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/PosicaoFetal"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/posicaoFetal/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PosicaoFetalPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/postura': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Postura"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PosturaPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Postura"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PosturaPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Postura"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/postura/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/PosturaPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/rupturaBolsa': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/RupturaBolsa"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/RupturaBolsaPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/RupturaBolsa"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/RupturaBolsaPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/RupturaBolsa"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/rupturaBolsa/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/RupturaBolsaPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/sangramento': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Sangramento"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/SangramentoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Sangramento"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/SangramentoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/Sangramento"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/sangramento/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/SangramentoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/statusGBS': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/StatusGBS"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/StatusGBSPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/StatusGBS"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/StatusGBSPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/StatusGBS"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/statusGBS/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/StatusGBSPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/tipoGravidez': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoGravidez"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoGravidezPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoGravidez"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoGravidezPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoGravidez"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/tipoGravidez/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoGravidezPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/tipoParto': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoParto"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoPartoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoParto"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoPartoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoParto"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/tipoParto/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoPartoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
        '/tipoSanguineo': {
          "get": {
            "summary" : "Retorna o documento com os itens ativos no array para o partograma informado",
            "parameters" : [{
              "name": "partogramaId",
              "in" : "path",
              "schema" : {
                "type" : "string",
                "example": '642c7d11b6740e002f082da7'
              }
            }],
            "responses" : {
              "200" : {
                "description" : "Documento com os itens ativos no array",
                "content": {
                  "application/json": {
                    "schema": {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoSanguineo"
                    }
                  }
                }
              },
              "500" : {
                "description" : "Internal Server Error"
              }
            }
          },
          "post" : {
            "summary" : "Criação de um novo item no array do documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoSanguineoPost"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "novo item do array inserido no documento",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoSanguineo"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          },
          "put" : {
            "summary" : "Atualização de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoSanguineoPut"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "Item do array atualizado",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type" : "object",                      
                      "$ref" : "#/components/schemas/TipoSanguineo"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
          }
        },
        "/tipoSanguineo/cancel": {
          "put" : {
            "summary" : "Exclusão lógica de um item do array no documento",
            "parameters": [
              {
                "name": "body",
                "in": "body",
                "required": "true",
                "schema": {
                  "$ref": "#/components/schemas/TipoSanguineoPutCancel"
                }
              }
            ],
            "responses" : {
              "200" : {
                "description" : "OK",
                "content" : {
                  "application/json": {
                    "schema" : {
                      "type": "string",                      
                      "example" : "{'message':'Item atualizado com sucesso!'}"
                    }
                  }
                }
            },
            "400" : {
              "description" : "NOK",
              "content" : {
                "application/json" : {
                  "schema": {
                    "type" : "string",                      
                    "example" : "{'message':'Falha ao processar sua requisição: + exception.message'}"
                  }
                }
              }
            }
          }
        }
        },
      },
      "components" : {
        "schemas" : {
          "partogramaId" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                  } 
            }
          },
          "Apgars" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "apgarsArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "umMinuto" : {
                        "type" : "number"
                      },
                      "cincoMinutos" : {
                          "type" : "number"
                      },
                      "gemelar": {
                        "type": "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "ApgarsPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "apgarsArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "umMinuto" : {
                        "type" : "number"
                      },
                      "cincoMinutos" : {
                          "type" : "number"
                      },
                      "gemelar": {
                        "type": "number"
                    },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "ApgarsPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "apgarsArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "umMinuto" : {
                        "type" : "number"
                      },
                      "cincoMinutos" : {
                          "type" : "number"
                      },
                      "gemelar": {
                        "type": "number"
                    },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "ApgarsPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "apgarsArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "AmostraSangueFetal" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "amostraSangueFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "ph" : {
                        "type" : "number"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
						          "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "AmostraSangueFetalPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "amostraSangueFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                    "ph" : {
                      "type" : "number"
                    },
                    "dtEvento" : {
                      "type": "string",
                      "format" : "date-time"
                    },
                    "observacao": {
                        "type": "string"
                    },
                    "gemelar": {
                        "type": "number"
                    },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "AmostraSangueFetalPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "amostraSangueFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                  "ph" : {
                    "type" : "number"
                  },
                  "dtEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                  "observacao": {
                      "type": "string"
                  },
                  "gemelar": {
                      "type": "number"
                  },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "AmostraSangueFetalPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "amostraSangueFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Companhia" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "companhiaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                  "dtInicioEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
					        "dtFimEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                  "observacao" : {
                    "type" : "string"
                },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "CompanhiaPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "companhiaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                  "dtInicioEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
					"dtFimEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                  "observacao" : {
                    "type" : "string"
                },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "CompanhiaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "companhiaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                  "dtInicioEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
					"dtFimEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                  "observacao" : {
                    "type" : "string"
                },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "CompanhiaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "companhiaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Contracoes" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "contracoesArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "numeroContracoes" : {
                    "type" : "number"
                  },
					"tempoContracoes" : {
					  "type" : "string"
                      },
                  "dtEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "ContracoesPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "contracoesArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "numeroContracoes" : {
                    "type" : "number"
                  },
					"tempoContracoes" : {
					  "type" : "string"
                      },
                  "dtEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "ContracoesPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "contracoesArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
 				  "numeroContracoes" : {
                    "type" : "number"
                  },
					"tempoContracoes" : {
					  "type" : "string"
                      },
                  "dtEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "ContracoesPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "contracoesArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom1" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom1Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom1Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom1Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom1Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom1Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom1PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom1Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom2" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom2Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom2Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom2Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom2Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom2Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom2PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom2Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom3" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom3Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom3Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom3Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom3Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom3Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom3PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom3Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom4" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom4Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom4Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom4Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom4Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom4Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom4PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom4Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom5" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom5Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom5Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom5Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom5Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom5Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom5PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom5Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom6" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom6Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom6Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom6Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom6Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom6Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom6PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom6Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom7" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom7Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom7Post" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom7Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "Custom7Put" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom7Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
				  "valor" : {
                    "type" : "string"
                  },
					"titulo" : {
					  "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Custom7PutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "custom7Array" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraParto" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
						"type": "string",
						"format" : "date-time"
					  },
					"observacao" : {
					  "type" : "string"
                      },
					"gemelar" : {
					  "type" : "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPartoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
						"type": "string",
						"format" : "date-time"
					  },
					"observacao" : {
					  "type" : "string"
                      },
					"gemelar" : {
					  "type" : "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "DataHoraPartoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
						"type": "string",
						"format" : "date-time"
					  },
					"observacao" : {
					  "type" : "string"
                      },
					"gemelar" : {
					  "type" : "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPartoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPlacenta" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPlacentaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPlacentaPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPlacentaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "DataHoraPlacentaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPlacentaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPlacentaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dataHoraPlacentaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Dequitacao" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dequitacaoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DequitacaoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dequitacaoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                    "dtEvento" : {
                      "type": "string",
                      "format" : "date-time"
                    },
                    "observacao": {
                        "type": "string"
                    },
                    "gemelar": {
                        "type": "number"
                    },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "DequitacaoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dequitacaoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                  "dtEvento" : {
                    "type": "string",
                    "format" : "date-time"
                  },
                  "observacao": {
                      "type": "string"
                  },
                  "gemelar": {
                      "type": "number"
                  },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DequitacaoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dequitacaoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },       
          "DilatacaoCervical" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dilatacaoCervicalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dilatacao" : {
                        "type" : "number"
                      },
					"esvaecimento": {
						"type": "string"
                      },
					"consistencia": {
						"type": "string"
                      },
					"posicao": {
						"type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DilatacaoCervicalPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dilatacaoCervicalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dilatacao" : {
                        "type" : "number"
                      },
					"esvaecimento": {
						"type": "string"
                      },
					"consistencia": {
						"type": "string"
                      },
					"posicao": {
						"type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "DilatacaoCervicalPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dilatacaoCervicalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dilatacao" : {
                        "type" : "number"
                      },
					"esvaecimento": {
						"type": "string"
                      },
					"consistencia": {
						"type": "string"
                      },
					"posicao": {
						"type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DilatacaoCervicalPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "dilatacaoCervicalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },      
          "Farmacologico" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "farmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "farmacologico": {
                          "type": "string"
                      },
						"regional": {
                          "type": "string"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
					"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "FarmacologicoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "farmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "farmacologico": {
                          "type": "string"
                      },
						"regional": {
                          "type": "string"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
					"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "FarmacologicoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "farmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "farmacologico": {
                          "type": "string"
                      },
						"regional": {
                          "type": "string"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
					"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "FarmacologicoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "farmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },   
          "HistoricoObstetrico" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "historicoObstetricoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "g" : {
                        "type" : "number"
                      },
						"p" : {
                        "type" : "number"
                      },
						"partosVaginais" : {
                        "type" : "number"
                      },
						"partosCesareos" : {
                        "type" : "number"
                      },
						"perdasPrecoces" : {
                        "type" : "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "HistoricoObstetricoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "historicoObstetricoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "g" : {
                        "type" : "number"
                      },
						"p" : {
                        "type" : "number"
                      },
						"partosVaginais" : {
                        "type" : "number"
                      },
						"partosCesareos" : {
                        "type" : "number"
                      },
						"perdasPrecoces" : {
                        "type" : "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "HistoricoObstetricoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "historicoObstetricoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "g" : {
                        "type" : "number"
                      },
						"p" : {
                        "type" : "number"
                      },
						"partosVaginais" : {
                        "type" : "number"
                      },
						"partosCesareos" : {
                        "type" : "number"
                      },
						"perdasPrecoces" : {
                        "type" : "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "HistoricoObstetricoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "historicoObstetricoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "IdadeGestacional" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "idadeGestacionalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "ultrassomSemanas" : {
                        "type" : "number"
                      },
						"ultrassomDias" : {
                        "type" : "number"
                      },
						"dumSemanas" : {
                        "type" : "number"
                      },
						"dumDias" : {
                        "type" : "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "IdadeGestacionalPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "idadeGestacionalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "ultrassomSemanas" : {
                        "type" : "number"
                      },
						"ultrassomDias" : {
                        "type" : "number"
                      },
						"dumSemanas" : {
                        "type" : "number"
                      },
						"dumDias" : {
                        "type" : "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "IdadeGestacionalPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "idadeGestacionalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "ultrassomSemanas" : {
                        "type" : "number"
                      },
						"ultrassomDias" : {
                        "type" : "number"
                      },
						"dumSemanas" : {
                        "type" : "number"
                      },
						"dumDias" : {
                        "type" : "number"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "IdadeGestacionalPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "idadeGestacionalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },          
          "DataHoraPlacenta" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ingestaoLiquidoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPlacentaPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ingestaoLiquidoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "DataHoraPlacentaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ingestaoLiquidoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "DataHoraPlacentaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ingestaoLiquidoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "InicioTrabalhoParto" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "inicioTrabalhoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "InicioTrabalhoPartoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "inicioTrabalhoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "InicioTrabalhoPartoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "inicioTrabalhoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "InicioTrabalhoPartoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "inicioTrabalhoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },        
          "LiquidoAmniotico" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "liquidoAmnioticoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "aspectoLiquido": {
                          "type": "string"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
						"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "LiquidoAmnioticoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "liquidoAmnioticoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "aspectoLiquido": {
                          "type": "string"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
						"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "LiquidoAmnioticoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "liquidoAmnioticoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "aspectoLiquido": {
                          "type": "string"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
						"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "LiquidoAmnioticoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "liquidoAmnioticoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoBebe" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoBebeArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "frequenciaCardiacaFetal" : {
                        "type" : "number"
                      },
						"gemelar" : {
                        "type" : "number"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoBebePost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoBebeArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "frequenciaCardiacaFetal" : {
                        "type" : "number"
                      },
						"gemelar" : {
                        "type" : "number"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoBebePut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoBebeArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "frequenciaCardiacaFetal" : {
                        "type" : "number"
                      },
						"gemelar" : {
                        "type" : "number"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoBebePutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoBebeArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoPaciente" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoPacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "frequenciaCardiaca" : {
                        "type" : "number"
                      },
						"pressaoArterialSistolica" : {
                        "type" : "number"
                      },
						"pressaoArterialDiastolica" : {
                        "type" : "number"
                      },
						"saturacaoO2Materna" : {
                        "type" : "number"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoPacientePost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoPacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "frequenciaCardiaca" : {
                        "type" : "number"
                      },
						"pressaoArterialSistolica" : {
                        "type" : "number"
                      },
						"pressaoArterialDiastolica" : {
                        "type" : "number"
                      },
						"saturacaoO2Materna" : {
                        "type" : "number"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoPacientePut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoPacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "frequenciaCardiaca" : {
                        "type" : "number"
                      },
						"pressaoArterialSistolica" : {
                        "type" : "number"
                      },
						"pressaoArterialDiastolica" : {
                        "type" : "number"
                      },
						"saturacaoO2Materna" : {
                        "type" : "number"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "MonitoramentoCardiacoPacientePutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "monitoramentoCardiacoPacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NaoFarmacologico" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "naoFarmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "itemNaoFarmacologico" : {
                        "type" : "array",
							"items" : {
								"type": "string"
							}
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NaoFarmacologicoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "naoFarmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "itemNaoFarmacologico" : {
                        "type" : "array",
							"items" : {
								"type": "string"
							}
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "NaoFarmacologicoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "naoFarmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "itemNaoFarmacologico" : {
                        "type" : "array",
							"items" : {
								"type": "string"
							}
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NaoFarmacologicoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "naoFarmacologicoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Nascimento" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "nascimentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoParto": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NascimentoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "nascimentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoParto": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "NascimentoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "nascimentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoParto": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NascimentoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "nascimentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },        
          "NotasClinicas" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "notasClinicasArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NotasClinicasPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "notasClinicasArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "NotasClinicasPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "notasClinicasArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "NotasClinicasPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "notasClinicasArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          
          },
          "Ocitocina" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ocitocinaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "numeroUnidadesOcitocina" : {
                        "type" : "number"
                      },
						"volumeDiluente" : {
                        "type" : "number"
                      },
						"velocidadeInfusao" : {
                        "type" : "number"
                      },
						"doseAdministrada" : {
                        "type" : "number"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
						"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "OcitocinaPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ocitocinaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "numeroUnidadesOcitocina" : {
                        "type" : "number"
                      },
						"volumeDiluente" : {
                        "type" : "number"
                      },
						"velocidadeInfusao" : {
                        "type" : "number"
                      },
						"doseAdministrada" : {
                        "type" : "number"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
						"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "OcitocinaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ocitocinaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "numeroUnidadesOcitocina" : {
                        "type" : "number"
                      },
						"volumeDiluente" : {
                        "type" : "number"
                      },
						"velocidadeInfusao" : {
                        "type" : "number"
                      },
						"doseAdministrada" : {
                        "type" : "number"
                      },
                      "dtInicioEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
						"dtFimEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "OcitocinaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "ocitocinaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },       
          "Paciente" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "pacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "nome": {
                          "type": "string"
                      },
						"dtNascimento": {
                          "type": "string"
                      },
                      "idade" : {
                        "type" : "number"
                      },
						"cpf" : {
                        "type" : "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PacientePost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "pacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "nome": {
                          "type": "string"
                      },
						"dtNascimento": {
                          "type": "string"
                      },
                      "idade" : {
                        "type" : "number"
                      },
						"cpf" : {
                        "type" : "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "PacientePut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "pacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "nome": {
                          "type": "string"
                      },
						"dtNascimento": {
                          "type": "string"
                      },
                      "idade" : {
                        "type" : "number"
                      },
						"cpf" : {
                        "type" : "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PacientePutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "pacienteArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Partograma" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "pacienteId" : {
                    "type" : "object",
                    "properties" : {
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                      },
                      "schema" : {
                        "type" : "object",                      
                        "$ref" : "#/components/schemas/Paciente"
                      }
                  }
                },
                "partogramaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "responsavel": {
                          "type": "string"
                      },
						"horario" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"statusPartograma": {
                          "type": "string"
                      },
                      "leito" : {
                        "type" : "string"
                      },
						"mv" : {
                        "type" : "string"
                      },
						"dtInicioEvento" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"dtFimEvento" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PartogramaPost" : {
            "type" : "object",
            "properties" : {
                "pacienteId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "responsavel": {
                          "type": "string"
                      },
						"horario" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"statusPartograma": {
                          "type": "string"
                      },
                      "leito" : {
                        "type" : "string"
                      },
						"mv" : {
                        "type" : "string"
                      },
						"dtInicioEvento" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"dtFimEvento" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "PartogramaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "responsavel": {
                          "type": "string"
                      },
						"horario" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"statusPartograma": {
                          "type": "string"
                      },
                      "leito" : {
                        "type" : "string"
                      },
						"mv" : {
                        "type" : "string"
                      },
						"dtInicioEvento" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"dtFimEvento" : {
                          "type": "string",
                          "format" : "date-time"
                      },
						"observacao" : {
                          "type" : "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PartogramaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PlanoCuidado" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "planoCuidadoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoPlanoCuidado": {
                          "type": "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PlanoCuidadoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "planoCuidadoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoPlanoCuidado": {
                          "type": "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "PlanoCuidadoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "planoCuidadoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoPlanoCuidado": {
                          "type": "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PlanoCuidadoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "planoCuidadoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PosicaoFetal" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posicaoFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "apresentacaoFetal": {
                          "type": "string"
                      },
						"variedadePosicaoFetal": {
                          "type": "string"
                      },
						"alturaApresentacaoFetal": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PosicaoFetalPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posicaoFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "apresentacaoFetal": {
                          "type": "string"
                      },
						"variedadePosicaoFetal": {
                          "type": "string"
                      },
						"alturaApresentacaoFetal": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "PosicaoFetalPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posicaoFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "apresentacaoFetal": {
                          "type": "string"
                      },
						"variedadePosicaoFetal": {
                          "type": "string"
                      },
						"alturaApresentacaoFetal": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PosicaoFetalPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posicaoFetalArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },   
          "Postura" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posturaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PosturaPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posturaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "PosturaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posturaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "PosturaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "posturaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "RupturaBolsa" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "rupturaBolsaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                    },
					  "bolsa": {
                          "type": "string"
                      },
					  "statusRupturaMembrana": {
                          "type": "string"
                      },
					  "indicacaoAmniotomia": {
                          "type": "string"
                      },
					  "volumeLiquidoAmniotico": {
                          "type": "string"
                      },
                      "liquidoAmnioticoId" : {
                        "type" : "string",
						"format" : "mongoose.Schema.Types.ObjectId"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "RupturaBolsaPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "rupturaBolsaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                    },
					  "bolsa": {
                          "type": "string"
                      },
					  "statusRupturaMembrana": {
                          "type": "string"
                      },
					  "indicacaoAmniotomia": {
                          "type": "string"
                      },
					  "volumeLiquidoAmniotico": {
                          "type": "string"
                      },
                      "liquidoAmnioticoId" : {
                        "type" : "string",
						"format" : "mongoose.Schema.Types.ObjectId"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "RupturaBolsaPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "rupturaBolsaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                    },
					  "bolsa": {
                          "type": "string"
                      },
					  "statusRupturaMembrana": {
                          "type": "string"
                      },
					  "indicacaoAmniotomia": {
                          "type": "string"
                      },
					  "volumeLiquidoAmniotico": {
                          "type": "string"
                      },
                      "liquidoAmnioticoId" : {
                        "type" : "string",
						"format" : "mongoose.Schema.Types.ObjectId"
                      },
                      "observacao": {
                          "type": "string"
                      },
					  "gemelar": {
                          "type": "number"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "RupturaBolsaPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "rupturaBolsaArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "Sangramento" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "sangramentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "volume": {
                          "type": "string"
                      },
					  "total": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "SangramentoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "sangramentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "volume": {
                          "type": "string"
                      },
					  "total": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "SangramentoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "sangramentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
					  "volume": {
                          "type": "string"
                      },
					  "total": {
                          "type": "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "SangramentoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "sangramentoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "StatusGBS" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "statusGBSArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "statusGbsValue" : {
                        "type" : "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "StatusGBSPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "statusGBSArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "statusGbsValue" : {
                        "type" : "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "StatusGBSPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "statusGBSArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "statusGbsValue" : {
                        "type" : "string"
                      },
                      "dtEvento" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "StatusGBSPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "statusGBSArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },    
          "TipoGravidez" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoGravidezArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoGravidez" : {
                        "type" : "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoGravidezPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoGravidezArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoGravidez" : {
                        "type" : "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "TipoGravidezPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoGravidezArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoGravidez" : {
                        "type" : "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoGravidezPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoGravidezArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoParto" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoParto" : {
                        "type" : "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoPartoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoParto" : {
                        "type" : "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "TipoPartoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "tipoParto" : {
                        "type" : "string"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoPartoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoPartoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoSanguineo" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoSanguineoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "grupoABO" : {
                        "type" : "string"
                      },
					  "fatorRH" : {
                        "type" : "string"
                      },
					  "variacaoMutacao" : {
                        "type" : "boolean"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "status" : {
                          "type" : "string"
                      },
                      "dtCadastro" : {
                          "type": "string",
                          "format" : "date-time"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      },
                      "dtAtualizacao" : {
                        "type": "string",
                        "format" : "date-time"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoSanguineoPost" : {
            "type" : "object",
            "properties" : {
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoSanguineoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "grupoABO" : {
                        "type" : "string"
                      },
					  "fatorRH" : {
                        "type" : "string"
                      },
					  "variacaoMutacao" : {
                        "type" : "boolean"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userCadastro" : {
                          "type" : "string"
                      }
                    }
                  }
                }
              }
          },
          "TipoSanguineoPut" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoSanguineoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "grupoABO" : {
                        "type" : "string"
                      },
					  "fatorRH" : {
                        "type" : "string"
                      },
					  "variacaoMutacao" : {
                        "type" : "boolean"
                      },
                      "observacao": {
                          "type": "string"
                      },
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
          "TipoSanguineoPutCancel" : {
            "type" : "object",
            "properties" : {
                "_id" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "partogramaId" : {
                    "type" : "string",
                    "format" : "objectid"
                },
                "tipoSanguineoArray" : {
                  "type" : "array",
                  "items" : {
                    "properties": {
                      "userAtualizacao" : {
                          "type" : "string"
                      },
                      "_id" : {
                        "type" : "string",
                        "format" : "objectid"
                    }
                    }
                  }
                }
              }
          },
        }
        }
    },
    apis: ['app.js'],
  };
  
const specs = swaggerJsdoc(options);

module.exports = specs;

