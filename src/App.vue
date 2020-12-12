<template>
  <div id="app">
    <router-view />
    <vue-progress-bar />
  </div>
</template>
<script>
export default {
  name: "App",
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      next();
    });
    this.$router.afterEach((to, from) => {
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
  },
};
</script>
