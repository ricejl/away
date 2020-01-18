<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark negativeMargin">
    <router-link :to="{name: 'home'}">
      <a class="navbar-brand">away</a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <router-link :to="{name: 'profile'}">
          <li v-if="this.$route.name != 'profile'" class="nav-item">
            <a class="nav-link" href="#">
              Profile
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </router-link>
        <router-link :to="{name: 'dashboard'}">
          <li v-if="this.$route.name != 'dashboard'" class="nav-item">
            <a class="nav-link">My Trips</a>
          </li>
        </router-link>
        <li class="nav-item">
          <button class="btn btn-logout ml-1 p-1" @click="logout">Log Out</button>
        </li>
        <br />
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.btn-logout {
  background-color: #ffa24b;
}
.navbar {
  padding: 0rem 1rem;
}
.navbar-brand {
  font-family: "Great Vibes", sans-serif;
  font-size: 3rem;
  padding: 0rem;
}
.negativeMargin {
  margin: 0px -15px 0px -15px;
}
.bg-dark {
  background-color: black !important;
}

a {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  color: #f3f3f3;
  text-shadow: 0 0 2px #f3f3f3;
}
</style>
