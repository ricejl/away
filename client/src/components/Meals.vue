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
        <i @click="dropdown = !dropdown" class="fas fa-angle-double-up"></i>
      </div>
    </div>
    <ul v-if="dropdown" class="text-left dropdown w-100">
      <li v-for="meal in meals" :key="meal._id">
        <h3>{{meal.title}}</h3>
        <ul>
          <li v-for="foodItem in meal.foodItems" :key="foodItem._id">{{foodItem.foodName}}</li>
        </ul>
        <form type="text" @submit.prevent="addFoodItem(meal._id)">
          <input type="text" v-model="newFoodItem.foodName" />
          <input type="text" v-model="newFoodItem.detalis" />
          <button type="submit">Add Item</button>
        </form>
      </li>
      <form @submit.prevent="addMeal" class="p-3">
        <input type="text" v-model="newMeal.title" placeholder="Enter Meal Title..." />
        <input type="text" v-model="newMeal.details" placeholder="Any details for your meal?" />
        <button type="submit">Add Meal</button>
      </form>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Meals",
  props: ["tripData"],
  mounted() {
    this.$store.dispatch("getProfileByUserId");
    console.log(this.$store.state.profile);
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
      },
      newFoodItem: {
        profileId: this.$store.state.profile._id,
        foodName: "",
        details: ""
      }
    };
  },
  methods: {
    addMeal() {
      let meal = { ...this.newMeal };
      console.log(this.$store.state.profile);
      this.$store.dispatch("addMeal", meal);
      this.newMeal = {
        title: "",
        details: "",
        foodItems: [],
        tripId: this.$route.params.tripId
      };
    },
    addFoodItem(mealId) {
      let foodItem = { ...this.newFoodItem };
      let tripId = this.$route.params.tripId;
      this.$store.dispatch("addFoodItem", { mealId, foodItem, tripId });
      this.newFoodItem = {
        profileId: this.$store.state.profile._id,
        foodName: "",
        details: ""
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