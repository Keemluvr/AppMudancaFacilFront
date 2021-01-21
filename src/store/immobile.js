import Vue from "vue";
import { listProperties, listPropertiesByOwner } from "@/services/immobile";

export const stateImmobile = {
  properties: [],
  propertiesByOwner: [],
  loadingProperties: false,
  lengthProperties: 0,
};

export const mutationsImmobile = {
  LIST_PROPERTIES(state, payload) {
    state.properties = payload;
  },
  LIST_PROPERTIES_BY_OWNER(state, payload) {
    state.propertiesByOwner = payload;
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
        context.state.lengthProperties = response.data.properties.length;
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
};
