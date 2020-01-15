<template>
  <div class="card-container">
    <br />
    <h4 class="mb-0">Meals</h4>
    <br />
    <div class="arrow" @click="dropdownBool = !dropdownBool" v-if="!dropdownBool">
      <i class="fas fa-angle-double-down"></i>
    </div>
    <div v-else class="arrow" @click="dropdownBool = !dropdownBool">
      <i class="fas fa-angle-double-up"></i>
    </div>
    <div v-if="dropdownBool" class="dropdown">
      <div>Your meals info here</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meals",
  props: ["tripData"],
  data() {
    return {
      dropdownBool: false
    };
  },
  methods: {}
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