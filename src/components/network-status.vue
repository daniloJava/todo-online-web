<template>
  <div class="network-status"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'offline-js';

declare var Offline: any;

@Component
export default class NetworkStatus extends Vue {

  constructor() {
    super();
    Offline.options = {
      // Verifica o status da conexão imediatamente ao carregar a página.
      checkOnLoad: false,

      // Monitora as requisições AJAX para verificar se há conexão ativa.
      interceptRequests: true,

      // Testa periodicamente a conexão quando a mesma está inativa (defina como 'false' para desativar).
      reconnect: {

        // Define quantos segundos deve aguardar antes de verificar a conexão novamente.
        initialDelay: 3,

      },

      // Armazena e tenta refazer as requisições que falharem enquanto a conexão estiver inativa.
      requests: true,
    };
  }
}
</script>
