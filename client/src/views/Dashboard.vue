<template>
  <div class="dashboard container-fluid">
    <div class="row">
      <div class="col-12">
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

          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </nav>
      </div>
    </div>
    <div class="row justify-content-around">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card-container">
          <h1 class="mb-0">Stanley</h1>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card-container">
          <h1 class="mb-0">Hot Springs</h1>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card-container">
          <h1 class="mb-0">Idaho City</h1>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card-container">
          <h1 class="mb-0">+</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
.dashboard {
  background: url("https://images.unsplash.com/photo-1473772564351-202a22a93101?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=671&q=80")
    no-repeat center;
  background-size: cover;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}
.card-container {
  background: rgba(232, 212, 180, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  min-height: 10em;
  min-width: 10em;
}
</style>
