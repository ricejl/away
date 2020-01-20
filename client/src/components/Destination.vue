<template>
  <div class="card-container top-card">
    <div class="w-100" @click="dropdown=!dropdown">
      <br />
      <h4
        v-if="trip.destinations && trip.destinations.length"
        class="mb-0"
      >{{trip.destinations[0].location}}</h4>
      <h4 v-else class="mb-0">Destination</h4>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>
    <div v-if="dropdown" class="dropdown w-100">
      <div
        @click="dropdown=!dropdown"
        v-for="destination in tripData.destinations"
        :key="destination._id"
      >{{destination.location}}</div>
      <form @submit.prevent="addDestination(tripData._id)" class="p-3">
        <input type="text" v-model="newDestination.location" placeholder="Enter location..." />
        <button type="submit">Add</button>
      </form>
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
      dropdown: false
    };
  },
  methods: {
    addDestination(tripId) {
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