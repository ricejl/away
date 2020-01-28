<template>
  <div class="card-container">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="mb-0 mr-1">Meals</h4>
        <span class="badge badge-primary badge-pill ml-1">{{meals.length}}</span>
      </div>
      <br />
      <div v-if="!dropdown" class="arrow">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>
    <div v-if="dropdown" class="dropdown w-100 pb-3">
      <div class="col-12 col-md-8 mx-auto">
        <ul class="list-group list-group-flush">
          <MealComponent v-for="meal in meals" :key="meal._id" :mealData="meal" />
        </ul>
        <div class="row">
          <div class="col-12 col-md-8 mx-auto">
            <form @submit.prevent="addMeal" class="p-3">
              <div class="form-group mb-1">
                <input
                  type="text"
                  v-model="newMeal.title"
                  class="form-control"
                  placeholder="Enter Meal Title..."
                />
              </div>
              <div class="form-group mb-1">
                <input
                  type="text"
                  v-model="newMeal.details"
                  class="form-control"
                  placeholder="Any details for your meal?"
                />
              </div>
              <button type="submit" class="btn meal-btn btn-block text-white">Add Meal</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dropdown"
      @click="dropdown = !dropdown"
      class="w-100 text-right arrow bottom-up-arrow"
    ></div>
  </div>
</template>

<script>
import MealComponent from "@/components/MealComponent";
export default {
  name: "Meals",
  props: ["tripData"],
  mounted() {
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
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  components: {
    MealComponent
  }
};
</script>

<style scoped>
.card-container {
  background: rgba(232, 212, 180, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  min-height: 5em;
}
.title-container {
  cursor: pointer;
  position: relative;
}
.arrow {
  font-size: 1.5em;
  position: absolute;
  right: 5%;
  bottom: 1%;
}
.down-arrow {
  position: absolute;
  right: 5%;
  bottom: 1%;
}
.up-arrow {
  position: absolute;
  right: 2%;
  top: 0;
}
.bottom-up-arrow {
  cursor: pointer;
}
.form-control {
  height: 2em;
}
.list-group-item {
  background-color: transparent;
  color: black;
}
.badge-primary {
  border: 1px solid rgb(128, 128, 128);
  color: #fff;
  background-color: rgba(4, 0, 198, 0.5);
}
input,
.btn,
.badge-primary {
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
}
input:focus {
  border: 1px solid rgba(255, 162, 75);
  box-shadow: 0 0 10px rgba(255, 162, 75);
}
.meal-btn {
  background: -webkit-linear-gradient(right, #ffa24b, #ca6200);
}
</style>
