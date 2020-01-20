<template>
  <div class="card-container top-card">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <!-- FIXME  old destination flashes on new trip view-->
      <div v-if="trip.destinations && trip.destinations.length" class="mb-0">
        <h4>{{ trip.destinations[0].location }}</h4>
      </div>
      <h4 v-else class="mb-0">Destination</h4>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up" @click="dropdown = !dropdown"></i>
      </div>
    </div>
    <!-- <transition name="slide"> -->
    <div v-if="dropdown" class="dropdown w-100">
      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center = m.position"
        ></gmap-marker>
      </gmap-map>
      <div v-for="destination in tripData.destinations" :key="destination._id">
        <br />
        <h5>{{ destination.location }}</h5>
        <!-- <google-map /> -->
      </div>
      <form @submit.prevent="addDestination(tripData._id)" class="p-3">
        <input
          type="text"
          v-model="newDestination.location"
          placeholder="Enter location..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
import mongoose from "mongoose";

//" /components/GoogleMap";

export default {
  name: "Destination",
  mounted() {
    this.$store.dispatch("getTripById", this.$route.params.tripId);
  },
  props: ["tripData"],
  data() {
    return {
      newDestination: {
        location: ""
      },
      dropdown: false,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  methods: {
    addDestination(tripId) {
      console.log(tripId);
      let destination = { ...this.newDestination };
      this.$store.dispatch("addDestination", { tripId, destination });
      this.newDestination = {
        location: ""
      };
    }
  },
  computed: {
    trip() {
      return this.$store.state.activeTrip;
    }
  },
  components: {
    GoogleMap
  }
};
</script>

<style scoped>
/* .slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.5s ease;
} */
.dropdown {
  /* transform: translateX(-100%); */
  transition: transform 1s ease-in-out;
}
.dropdown > div {
  transition-delay: 0.5s;
}
.card-container {
  background: rgba(232, 212, 180, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  min-height: 5em;
  cursor: pointer;
}
.top-card {
  background: rgba(255, 162, 75, 0.75) !important;
}
.arrow {
  font-size: 1.5em;
  position: absolute;
  right: 5%;
  bottom: 1%;
}
</style>
