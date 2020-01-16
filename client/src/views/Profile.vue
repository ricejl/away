<template>
  <div class="container-fluid profile">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="row">
      <div class="col-12 img-row-ht p-5 bg-green">
        <i class="fas fa-user fa-8x"></i>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pt-4">
        <h3>First Last</h3>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-6">
        <h5>My Trips</h5>
      </div>
      <div class="col-6">
        <h5>Interests</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Profile",
  components: { Navbar }
};
</script>

<style>
.img-row-ht {
  min-height: 35vh;
}

.bg-green {
  background: rgba(40, 46, 36, 0.2);
}
</style>