<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 fakenavbar">
        <img class="away-logo mt-1" src="../assets/away-logo-white.svg" alt />
      </div>
    </div>
    <div class="row pt-5">
      <div class="col-12 mt-4">
        <div class="btn-container">
          <button class="demo-btn mx-auto text-white">
            <p class="mb-0">DEMO TRIP</p>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="btn-container">
          <router-link v-if="user._id" :to="{ name: 'dashboard' }">
            <button class="login-btn mx-auto">
              <p class="mb-0">LOGIN</p>
            </button>
          </router-link>
          <router-link v-else :to="{ name: 'login' }">
            <button class="login-btn mx-auto">
              <p class="mb-0">LOGIN</p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {}
};
</script>

<style scoped>
.fakenavbar {
  height: 10vh;
  background-color: black;
  color: white;
}
.away-logo {
  height: 9vh;
}
.home {
  background: url("https://images.unsplash.com/photo-1537000413083-5cf29e3cfcd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80")
    no-repeat center;
  background-size: cover;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}
.btn-container {
  padding: 3em 0;
  text-align: center;
}
.demo-btn,
.login-btn {
  border: 1px solid #ffa24b;
  font-size: 1.5em;
  letter-spacing: 2px;
  min-width: 10em;
  padding: 0.5em 0;
}
.demo-btn {
  background-color: rgba(4, 4, 4, 0.35);
}
.login-btn {
  background-color: rgba(255, 162, 75, 0.6);
}
</style>
