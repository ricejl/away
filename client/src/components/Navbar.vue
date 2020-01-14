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

    <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
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
