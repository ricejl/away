<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 fakenavbar">
        <div class="appName">away</div>
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

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    // HelloWorld
  }
};
</script>

<style scoped>
.appName {
  margin-top: -0.5rem;
  font-size: 3rem;
  font-family: "Great Vibes", sans-serif;
}
.fakenavbar {
  height: 10vh;
  background-color: black;
  color: white;
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
