import Vue from "vue";
import { listProperties } from "@/services/immobile";

export const stateImmobile = {
  properties: [],
  loadingProperties: false,
};

export const mutationsImmobile = {
  LIST_PROPERTIES(state, payload) {
    state.properties = payload;
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
};
