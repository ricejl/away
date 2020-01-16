<template>
  <div class="card-container top-card">
    <div @click="dropdown=!dropdown">
      <br />
      <h4 class="mb-0">Destination</h4>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>
    <!-- <transition name="slide"> -->
    <div v-if="dropdown" class="dropdown">
      <form @submit.prevent="addDestination(tripData._id)" class="p-3">
        <input type="text" v-model="newDestination.location" placeholder="Enter location..." />
        <button type="submit">Add</button>
      </form>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "Destination",
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
      console.log(tripId);
      let destination = { ...this.newDestination };
      this.$store.dispatch("addDestination", { tripId, destination });
      this.newDestination = {
        location: ""
      };
    }
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