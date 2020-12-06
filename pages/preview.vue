<template>
  <div>
    <div id="embedded_messenger">
        <header id="message_header" onclick="Botkit.toggle()">Chat</header>
        <iframe  id="botkit_client" :src="srcUrl" style="border: 0;display: block;" width="szwidth" height="szheight" scrolling="no"></iframe>
    </div>
  </div>
</template>


<script>
  /*
    https://staging.vovo.chat/preview/?id=723391&auth_code=OdI2dWMLe7zlARNbTZ78BwlHCZz5W2dS
    https://github.com/howdyai/botkit-starter-web/blob/master/docs/botkit_web_client.md#embed-botkit-in-a-website-with-iframes
  */
  export default {
    head() {
      return {
        title: '',
        script: [
          {   
              hid: 'embed',
              src: '/js/embed.js',
              defer: true,
          }
        ],
      }
    },
    components: {

    },
    data: () => ({
            loaded: false,
            error: false,
            preview_id: false,
            preview_auth_code: false,
            szwidth: 300,
            szheight: 600,
            srcUrl: false,
    }),
    mounted() {
      this.preview_id = this.$route.query.id;
      this.preview_auth_code = this.$route.query.auth_code;
      this.srcUrl = "/innerchat.html?auth_token=" + this.preview_auth_code + "&preview=1";

      const options = {};
      Botkit.boot(options);
    },
    methods: {
    }
}
</script>

<style scoped>
  #embedded_messenger {
    position: fixed;
    z-index: 1000;
    bottom: -400px;
    right: 2rem;
    height: 434px;
    transition: 0.5s ease-in-out bottom; }
    #embedded_messenger.active {
      bottom: 0; }
    #embedded_messenger iframe {
      height: 400px;
      width: 100%;
      border: 0; }
    #embedded_messenger #message_header {
      background: #000;
      padding: 0.5rem 1rem;
      color: #FFF; }
</style>
