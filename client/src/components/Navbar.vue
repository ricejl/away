<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark negativeMargin">
    <a class="navbar-brand" href="#">away</a>
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
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <button class="btn btn-logout" @click="logout">Log Out</button>
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
</style>
