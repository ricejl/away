<template>
  <div class="card-container" @click="dropdown = !dropdown">
    <br />
    <h4 class="mb-0">Carpool</h4>
    <br />
    <div class="arrow" v-if="!dropdown">
      <i class="fas fa-angle-double-down"></i>
    </div>
    <div v-else class="arrow">
      <i class="fas fa-angle-double-up"></i>
    </div>
    <!-- <transition name="slide"> -->
    <div v-if="dropdown" class="dropdown">
      <div>Your carpool info here</div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "Carpool",
  props: ["tripData"],
  data() {
    return {
      dropdown: false
    };
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