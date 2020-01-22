<template>
  <div class="card-container">
    <div class="title-container w-100" @click="dropdown = !dropdown">
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="mb-0 mr-1">Meals</h4>
        <span class="badge badge-primary badge-pill ml-1">{{meals.length}}</span>
      </div>
      <br />
      <div v-if="!dropdown" class="arrow down-arrow">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow up-arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>
    <div v-if="dropdown" class="row text-left dropdown w-100">
      <div class="col-12 col-md-10 mx-auto">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(meal, index) in meals" :key="meal._id">
            <h3>{{meal.title}}</h3>
            <ul>
              <li v-for="foodItem in meal.foodItems" :key="foodItem._id">
                {{foodItem.foodName}}
                <p class="food-item-author">Added by: {{profile.name}}</p>
              </li>
            </ul>
            <form class="w-50 mx-auto" type="text" @submit.prevent="addFoodItem(meal._id, index)">
              <div class="form-group mb-1">
                <input
                  type="text"
                  class="form-control"
                  v-model="newFoodItems[index].foodName"
                  placeholder="Enter Food Item..."
                />
              </div>
              <div class="form-group mb-1">
                <input
                  type="text"
                  class="form-control"
                  v-model="newFoodItems[index].details"
                  placeholder="Food Item Details..."
                />
              </div>
              <button type="submit" class="btn btn-info">Add Item</button>
            </form>
          </li>
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
              <button @click="addFoodItemForm()" type="submit" class="btn btn-success">Add Meal</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dropdown"
      @click="dropdown = !dropdown"
      class="w-100 text-right arrow bottom-up-arrow"
    >
      <i class="fas fa-angle-double-up pr-3"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meals",
  props: ["tripData"],
  mounted() {
    // this.$store.dispatch("getProfileByUserId");
    console.log("Meals view mounted profile:", this.$store.state.profile);
    this.$store
      .dispatch("getMealsByTripId", this.$route.params.tripId)
      .then(res => {
        this.getFoodItemForms();
      });
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
      newFoodItems: []
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
    },
    addFoodItem(mealId, index) {
      let foodItem = { ...this.newFoodItems[index] };
      let tripId = this.$route.params.tripId;
      this.$store.dispatch("addFoodItem", { mealId, foodItem, tripId });
      this.newFoodItems[index] = {
        profileId: this.profile._id,
        foodName: "",
        details: ""
      };
    },
    addFoodItemForm() {
      this.newFoodItems.push({
        profileId: this.profile._id,
        foodName: "",
        details: ""
      });
      console.log(this.newFoodItems);
    },
    getFoodItemForms() {
      this.meals.forEach(m => {
        this.newFoodItems.push({
          profileId: this.profile._id,
          foodName: "",
          details: ""
        });
      });
    }
  },
  computed: {
    meals() {
      return this.$store.state.meals;
    },
    profile() {
      return this.$store.state.profile;
    }
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
  padding: 0.5em;
}
.down-arrow {
  position: absolute;
  right: 2%;
  top: 0;
}
.up-arrow {
  position: absolute;
  right: 2%;
  top: 0;
}
.bottom-up-arrow {
  cursor: pointer;
}
.food-item-author {
  font-size: 0.75em;
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
</style>
