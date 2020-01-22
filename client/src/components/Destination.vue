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
                class="mb-3 btn-dark text-light-grey"
                @click="getCoords(trip.destinations[0].location)"
                v-if="!showMap"
              >
                Show map
              </button>
              <button
                class="mb-3 btn-dark text-light-grey"
                @click="showMap = !showMap"
                v-if="showMap"
              >
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
                    :position="center"
                    :clickable="true"
                    :draggable="false"
                    @click="launchURL()"
                  ></gmap-marker>
                </gmap-map>
              </div>
              <ul class="list-group list-group-flush mt-4">
                <li
                  v-for="(destination, i) in tripData.destinations"
                  :key="destination._id"
                  class="list-group-item list-group-item-action"
                >
                  {{ destination.location }}
                  <i
                    title="delete"
                    class="far fa-times-circle"
                    @click="deleteDestination(destination._id)"
                  ></i>
                  <i v-if="i == 0" class="fas fa-meteor"></i>
                </li>
              </ul>
              <p id="meteor">
                <i class="fas fa-meteor pr-1 pt-3"></i>indicates final
                destination
              </p>
            </div>
          </div>
          <!-- </div> -->
          <form @submit.prevent="addDestination(tripData._id)" class="p-3">
            <input
              class="bg-lightest-grey pl-1"
              type="text"
              v-model="newDestination.location"
              placeholder="Address or coordinates"
            />
            <button class="btn-dark text-light-grey" type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      //{ position: { lat: 44.21585, lng: -114.933588 } }
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
      this.markers.push(this.$store.state.coords);
    },
    deleteDestination(id) {
      this.$store.dispatch("removeDestination", {
        tripId: this.$route.params.tripId,
        destinationId: id
      });
    },
    launchURL() {
      window.open(
        // `https://www.google.com/maps/search/?api=1&${this.$store.state.coords.lat},${this.$store.state.coords.lng}`,
        `https://maps.google.com/maps?q=${this.$store.state.coords.lat},${this.$store.state.coords.lng}`,
        "_blank"
      );
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
  right: 5%;
  bottom: 1%;
}
.text-light-grey {
  color: #ebe6e6;
}
.bg-lightest-grey {
  background: #f3f3f3;
}
.list-group-item {
  background-color: transparent;
  color: black;
  border: none;
}
.list-group {
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: rgba(255, 162, 75, 0.4);
  box-shadow: 1px 3px 9px black;
}
.fa-times-circle {
  cursor: pointer;
  font-size: 1.2em;
  position: absolute;
  right: 2%;
  top: 35%;
  opacity: 0.2;
}
.fa-times-circle:hover {
  opacity: 0.5;
}
#meteor {
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.85em;
  font-weight: bold;
}
</style>
