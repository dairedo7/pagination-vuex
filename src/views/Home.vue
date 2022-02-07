<template>
  <div>
    <router-view />
    <postsList :posts_data="POSTS" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import postsList from "../components/get-posts.vue";

export default {
  name: "App",
  components: {
    postsList,
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters(["POSTS"]),
  },
  methods: {
    ...mapActions(["GET_POSTS_FROM_API"]),
  },

  mounted() {
    this.GET_POSTS_FROM_API();
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
