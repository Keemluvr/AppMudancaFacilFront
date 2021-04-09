import Vue from "vue";
import router from '../router'
import { listProperties, listPropertiesByOwner, listImmobileById, registrationImmobile } from "@/services/immobile";
import { getLocationByCEP } from "@/services/cep";

export const stateImmobile = {
  properties: [],
  propertiesByOwner: [],
  loadingProperties: false,
  lengthPagesProperties: 0,
  currentPageProperties: 1,
  immobile: {},
  loadingImmobile: false,
  newImmobileCurrentStep: 0,
  newImmobile: {
    title: null,
    category: null,
    businessType: null,
    furnished: { 
      included: false
    },
    availableRoom: [],
    size: {
      usefulArea: null,
      totalArea: null,
    },
    airConditioning: false,
    wifiMore: {
      wifi: false,
      internet: false,
      landline: false
    },
    petFriendly: false,
    smookingPermitted: false
  },
  additionalPropertyAddresses: {},
  newImmobileSteps: [
    "Detalhes do imóvel",
    "Localização",
    "Pagamento",
    "Informações de contato",
  ]
};

export const mutationsImmobile = {
  LIST_PROPERTIES(state, payload) {
    state.properties = payload;
  },
  LIST_PROPERTIES_BY_OWNER(state, payload) {
    state.propertiesByOwner = payload;
  },
  GET_IMMOBILE_BY_ID(state, payload) {
    state.immobile = payload;
  },
  GET_ADDITIONAL_INFORMATION_BY_CEP_PROPERTY(state, payload) {
    state.additionalPropertyAddresses = payload;
  },
};

export const actionsImmobile = {
  /** Action para listar os imóveis */
  getProperties(context, payload) {
    context.state.loadingProperties = true;
    listProperties(payload && payload)
      // Listagem realizada com sucesso
      .then((response) => {
        context.state.loadingProperties = false;
        context.state.lengthPagesProperties = response.data.totalPages;
        context.state.currentPageProperties = ~response.data.currentPage;
        // Atualiza as variáveis de login
        context.commit("LIST_PROPERTIES", response.data.properties);
      })
      // Erro ao realizar login
      .catch(({ response }) => {
        context.state.loadingProperties = false;

        // Mostra o popup que houve um erro ao realizar o login
        Vue.$toast.open(
          payload.popupError
            ? payload.popupError
            : {
                message: response.data.error,
                type: "error",
                position: "top-right",
              }
        );
      });
  },

  // Lista os imóveis pelo id do usuário
  getPropertiesByOwner(context, payload) {
    context.state.loadingProperties = true;
    listPropertiesByOwner(payload)
      // Listagem realizada com sucesso
      .then((response) => {
        response.data.length > 0 &&
          context.commit("LIST_PROPERTIES_BY_OWNER", Array.from(response.data));
      })
      // Erro ao realizar listagem
      .catch(({ response }) => {
        context.state.loadingProperties = false;
        // Mostra o popup que houve um erro ao listar propriedades
        Vue.$toast.open(
          payload.popupError
            ? payload.popupError
            : {
                message: response.data.error,
                type: "error",
                position: "top-right",
              }
        );
      });
  },

  // Lista o imóvel pelo seu id
  getImmobileById(context, payload) {
    context.state.loadingImmobile = true;
    listImmobileById(payload)
      // Imóvel encontrado com sucesso
      .then((response) => {
        context.state.loadingImmobile = false;
        context.commit("GET_IMMOBILE_BY_ID", response.data.immobile);
      })
      // Erro ao procurar imóvel
      .catch(({ response }) => {
        context.state.loadingImmobile = false;
        // Mostra o popup que houve um erro ao encontrar imóvel
        Vue.$toast.open(
          payload.popupError
            ? payload.popupError
            : {
                message: response.data.error,
                type: "error",
                position: "top-right",
              }
        );
      });
  },

  // Preenche primeira parte do formulário
  setFirstStep(context, payload) {
    context.state.newImmobile = payload
    context.state.newImmobileCurrentStep = 1
  },

  // Preenche segunda parte do formulário
  setSecondStep(context, payload) {
    context.state.newImmobile = { 
      ...JSON.parse(JSON.stringify(context.state.newImmobile)), 
      ...payload 
    }
    context.state.newImmobileCurrentStep = 2
  },

  // Preenche terceira parte do formulário
  setThirdStep(context, payload) {
    context.state.newImmobile = { 
      ...JSON.parse(JSON.stringify(context.state.newImmobile)), 
      ...payload 
    }

    context.state.newImmobileCurrentStep = 3
  },

  // Preenche quarta parte do formulário
  setFourStep(context, payload) {
    context.state.newImmobile = { 
      ...JSON.parse(JSON.stringify(context.state.newImmobile)), 
      ...payload 
    }

    context.state.newImmobileCurrentStep = 4
  },

  // Volta para o passo inicial do cadastro
  resetPropertyRegistration(context) {
    context.state.newImmobile = {
      title: null,
      category: null,
      businessType: null
    }
    context.state.newImmobileCurrentStep = 0
  },

  // Salva o imóvel no banco de dados
  saveImmobile(context, payload) {
    registrationImmobile(payload, JSON.parse(localStorage.getItem('MF_USER')).token)
    // salvo com sucesso
    .then(async (response) => {
      console.log('deu certo', response)
       // Mostra o popup confirmando o cadastro do imóvel
       Vue.$toast.open(
        payload.popupError
          ? payload.popupError
          : {
              message: 'Imóvel cadastrado com sucesso!',
              type: "success",
              position: "top-right",
            }
      );
      // Relista todos os imóveis
      await listProperties(payload && payload)
      // Listagem realizada com sucesso
      .then((response) => {
        context.state.loadingProperties = false;
        context.state.lengthPagesProperties = response.data.totalPages;
        context.state.currentPageProperties = ~response.data.currentPage;
        // Atualiza as variáveis da listagem de imóveis
        context.commit("LIST_PROPERTIES", response.data.properties);
      })
      // Erro ao realizar listagem
      .catch(({ response }) => {
        context.state.loadingProperties = false;

        // Mostra o popup que houve um erro ao realizar listagem
        Vue.$toast.open(
          payload.popupError
            ? payload.popupError
            : {
                message: response.data.error,
                type: "error",
                position: "top-right",
              }
        );
      });

      // Redireciona para a tela inicial
      router.push('/')
    })
    // Erro ao salvar
    .catch(({ response }) => {
      console.log('deu errado', response)
       // Mostra o popup que houve um erro ao cadastrar imóvel
       Vue.$toast.open(
        payload.popupError
          ? payload.popupError
          : {
              message: response.data.error,
              type: "error",
              position: "top-right",
            }
      );
    })
  },

  // Retorna endereços adicionais a partir do CEP
  getAdditionalInformationProperty(context, payload) {
    const cep = payload.replace(/([^\d])+/gim, '');
    getLocationByCEP(cep)
      .then((response) => {
        context.commit("GET_ADDITIONAL_INFORMATION_BY_CEP_PROPERTY", JSON.parse(JSON.stringify(response.data)));
      })
  }
};
