<template>
  <div class="card-container top-card">
    <div id="title-container" class="w-100" @click="dropdown = !dropdown">
      <!-- <br /> -->
      <div class="row">
        <div class="col-12">
          <h4 v-if="trip.destinations && trip.destinations.length" class="mb-0">
            {{ trip.destinations[0].location }}
          </h4>
          <h4 v-else class="mb-0">Destination</h4>
          <!-- <br /> -->
          <div class="arrow" v-if="!dropdown">
            <i class="fas fa-angle-double-down"></i>
          </div>
          <div v-else class="arrow">
            <i class="fas fa-angle-double-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row w-100">
      <div class="col-12">
        <div v-if="dropdown" class="dropdown">
          <!-- <div @click="dropdown=!dropdown"> -->
          <div class="row">
            <div class="col-12 col-md-6 mx-auto">
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
              <ul class="list-group list-group-flush">
                <li
                  v-for="destination in tripData.destinations"
                  :key="destination._id"
                  class="list-group-item list-group-item-action"
                >
                  {{ destination.location }}
                  <i
                    class="far fa-times-circle"
                    @click="deleteDestination(destination._id)"
                  ></i>
                </li>
              </ul>
            </div>
          </div>
          <!-- </div> -->
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
    </div>
  </div>
</template>

<script>
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
    },
    deleteDestination(id) {
      this.$store.dispatch("removeDestination", {
        tripId: this.$route.params.tripId,
        destinationId: id
      });
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
#title-container h4 {
  color: black;
  cursor: pointer;
  font-weight: bold;
  padding: 1em 0;
}
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
}
.top-card {
  background: rgba(255, 162, 75, 0.75) !important;
}
.arrow {
  cursor: pointer;
  font-size: 1.5em;
  position: absolute;
  left: 4%;
  top: 2%;
}
.list-group-item {
  background-color: transparent;
  color: black;
  font-weight: bold;
}

.fa-times-circle {
  cursor: pointer;
  font-size: 1.2em;
  position: absolute;
  right: 2%;
  top: 35%;
}
</style>
