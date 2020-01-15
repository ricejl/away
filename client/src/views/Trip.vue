<template>
  <div class="trip container-fluid">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-10 mx-auto">
        <Destination :tripData="trip"></Destination>
      </div>
      <div class="col-12 col-lg-10 mx-auto">
        <Carpool :tripData="trip"></Carpool>
      </div>
      <!-- <div class="col-12">
        <div class="card-container">
          <h4 class="mb-0">Car Pool</h4>
        </div>
      </div>-->
      <div class="col-12 col-lg-10 mx-auto">
        <div class="card-container">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Destination from "@/components/Destination";
import Carpool from "@/components/Carpool";

export default {
  name: "Trip",
  params: ["tripId"],
  mounted() {
    this.$store.dispatch("getAllTrips");
    console.log("tripId from params:", this.$route.params.tripId);
  },
  computed: {
    trip() {
      return (
        this.$store.state.trips.find(
          t => t._id == this.$route.params.tripId
        ) || {
          title: "Loading..."
        }
      );
    }
  },
  components: {
    Navbar,
    Destination,
    Carpool
  },
  methods: {}
};
</script>

<style scoped>
.trip {
  background: url("https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60")
    no-repeat bottom;
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
  min-height: 5em;
}
</style>
