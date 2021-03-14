import Vue from "vue";
import { listProperties, listPropertiesByOwner, listImmobileById } from "@/services/immobile";

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
    businessType: null
  },
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
  }
};
