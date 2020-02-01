<template>
  <div class="trip container-fluid">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="row">
      <div class="col-6 mx-auto"></div>
      <div class="col-12 col-lg-10 mx-auto pt-3">
        <h3 v-if="trip.title" class="text-white">{{ trip.title }}</h3>
        <div v-else class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-if="trip.authorId" class="col-12 col-lg-10 mx-auto">
        <Destination :tripData="trip"></Destination>
      </div>
      <div v-if="trip.authorId" class="col-12 col-lg-10 mx-auto">
        <Members :tripData="trip" />
      </div>

      <div v-if="trip.authorId" class="col-12 col-lg-10 mx-auto">
        <Carpool :tripData="trip"></Carpool>
      </div>
      <div v-if="trip.authorId" class="col-12 col-lg-10 mx-auto">
        <Meals :tripData="trip"></Meals>
      </div>
      <!-- <div class="col-12">
        <div class="card-container">
          <h4 class="mb-0">Car Pool</h4>
        </div>
      </div>-->
      <div v-if="trip.authorId" class="col-12 col-lg-10 mx-auto mb-3">
        <Lists :tripData="trip"></Lists>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Destination from "@/components/Destination";
import Carpool from "@/components/Carpool";
import Meals from "@/components/Meals";
import Members from "@/components/Members";
import Lists from "@/components/Lists";

export default {
  name: "Trip",
  data() {
    return {};
  },
  params: ["tripId"],
  mounted() {
    this.$store.dispatch("getTripById", this.$route.params.tripId);
  },
  computed: {
    trip() {
      return this.$store.state.activeTrip;
    }
  },
  components: {
    Navbar,
    Destination,
    Carpool,
    Meals,
    Members,
    Lists
  },
  methods: {}
};
</script>

<style scoped>
.trip {
  background: url("https://images.unsplash.com/photo-1536746803623-cef87080bfc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1864&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: "Montserrat", sans-serif;
  min-height: 100vh;
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
