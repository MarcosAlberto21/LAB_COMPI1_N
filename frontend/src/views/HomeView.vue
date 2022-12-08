<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <input type="text" v-model="texto" placeholder="Ingresa tu texto aqui"></input>
    <pre>{{ errores_sintacticos }}</pre>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-danger" @click="texto = ''">Limpiar</button>

      </div>
      <div class="col">
        <button type="button" class="btn btn-primary" @click="realizarAnalisis">Analizar</button>

      </div>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  data: () => ({
    errores_sintacticos: [],
    texto: '',

  }),


  async created() {
    console.log("URL EN USO", process.env.VUE_APP_SERVICE_URL1);

  },

  methods: {

    async realizarAnalisis() {
      try {
        let r = await this.$store.state.services.serviciosUsuario.realizarAnalisis({ text: this.texto })
        console.log("Respuesta del analisis ", r);
        this.errores_sintacticos = r.data.errores_sintacticos;
      } catch (error) {
        console.log("Error no es posible gestionar el analisis del txt");
      }
    }


  }
}
</script>
