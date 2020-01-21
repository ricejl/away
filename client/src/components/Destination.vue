<template>
  <div class="card-container top-card">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />

      <h4 v-if="trip.destinations && trip.destinations.length" class="mb-0">
        {{ trip.destinations[0].location }}
      </h4>

      <h4 v-else class="mb-0">Destination</h4>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up" @click="dropdown = !dropdown"></i>
      </div>
    </div>
    <div v-if="dropdown" class="dropdown w-100">
      <button
        class="mb-3"
        @click="getCoords(trip.destinations[0].location)"
        v-if="!showMap"
      >
        Show map
      </button>
      <button class="mb-3" @click="showMap = !showMap" v-if="showMap">
        Hide map
      </button>
      <br />
      <div v-if="showMap">
        <gmap-map
          :center="center"
          :zoom="12"
          style="width:100%;  height: 400px;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center = m.position"
          ></gmap-marker>
        </gmap-map>
      </div>
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
  </div>
</template>

<script>
// import GoogleMap from "./GoogleMap";
// import mongoose from "mongoose";
// import { gmapApi } from "vue2-google-maps";

// var geocoder = new gmapApi.maps.Geocoder();
// let address = { address: "Stanley ID" };
// callback = function(results, status) {
//   console.log(results);
// };
// geocoder.geocode(address, callback);
// " /components/GoogleMap";

// ------ ANOTHER TRY --------

// this.$refs.gmap.$mapCreated.then(() => {
//   var geocoder = new google.maps.Geocoder();

//   var address = "Dublin";

//   geocoder.geocode({ address: address }, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       var latitude = results[0].geometry.location.lat();
//       var longitude = results[0].geometry.location.lng();

//       console.log("latitude: ", latitude);
//       // initialize(latitude,longitude);
//     }
//   });
// });

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
      currentPlace: null,
      showMap: false
    };
  },
  methods: {
    addDestination(tripId) {
      let destination = { ...this.newDestination };
      this.$store.dispatch("addDestination", { tripId, destination });
      this.newDestination = {
        location: ""
      };
    },
    async getCoords(location) {
      await this.$store.dispatch("getCoords", location);
      this.showMap = true;
      this.center = this.$store.state.coords;
    }
  },
  computed: {
    trip() {
      return this.$store.state.activeTrip;
    }
    // google: gmapApi
  },
  components: {
    //GoogleMap
  }
};
</script>

<style scoped>
.dropdown {
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
