<template>
  <div class="card-container">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <h4 class="mb-0">Meals</h4>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>
    <div v-if="dropdown" class="dropdown w-100">
      <div @click="dropdown=!dropdown" v-for="meal in meals" :key="meal._id">{{meal.title}}</div>
      <form @submit.prevent="addMeal" class="p-3">
        <input type="text" v-model="newMeal.title" placeholder="Enter Meal Title..." />
        <input type="text" v-model="newMeal.details" placeholder="Any details for your meal?" />
        <button type="submit">Add Meal</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meals",
  props: ["tripData"],
  mounted() {
    console.log(this.$route.params.tripId);
    this.$store.dispatch("getMealsByTripId", this.$route.params.tripId);
  },

  data() {
    return {
      dropdown: false,
      newMeal: {
        title: "",
        details: "",
        foodItems: [],
        tripId: this.$route.params.tripId
      }
    };
  },
  methods: {
    addMeal() {
      let meal = { ...this.newMeal };
      this.$store.dispatch("addMeal", meal);
      this.newMeal = {
        title: "",
        details: "",
        foodItems: [],
        tripId: this.$route.params.tripId
      };
    }
  },
  computed: {
    meals() {
      return this.$store.state.meals;
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