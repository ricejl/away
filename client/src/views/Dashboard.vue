<template>
  <div class="dashboard container-fluid">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
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
import Navbar from "@/components/Navbar";
export default {
  name: "Dashboard",
  components: {
    Navbar
  }
};
</script>

<style scoped>
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
