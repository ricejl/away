<template>
  <li class="list-group-item">
    <div class="d-flex justify-content-start align-items-center">
      <div class="btn-group dropright">
        <button type="button" class="btn" data-toggle="dropdown">
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Edit</button>
          <button @click="deleteMeal(mealData._id)" class="dropdown-item">Delete</button>
        </div>
      </div>
      <h3 class="mb-0">{{mealData.title}}</h3>
    </div>
    <ul class="food-item-ul">
      <li v-for="foodItem in mealData.foodItems" :key="foodItem._id">
        <div class="d-flex justify-content-start align-items-center">
          <div class="btn-group dropright">
            <button type="button" class="btn btn-sm" data-toggle="dropdown">
              <i class="fas fa-ellipsis-v food-item-menu"></i>
            </button>
            <div class="dropdown-menu">
              <button class="dropdown-item">Edit</button>
              <button
                @click="deleteFoodItem(mealData._id, foodItem._id)"
                class="dropdown-item"
              >Delete</button>
            </div>
          </div>
          <span>{{foodItem.foodName}}</span>
        </div>
        <p class="food-item-details mb-0 ml-5">{{foodItem.details}}</p>
        <p class="food-item-author">Added by: {{foodItem.profileId.firstName}}</p>
      </li>
    </ul>
    <form class="w-50 mx-auto" type="text" @submit.prevent="addFoodItem(mealData._id)">
      <div class="form-group mb-1">
        <input
          type="text"
          class="form-control"
          v-model="newFoodItem.foodName"
          placeholder="Enter Food Item..."
        />
      </div>
      <div class="form-group mb-1">
        <input
          type="text"
          class="form-control"
          v-model="newFoodItem.details"
          placeholder="Food Item Details..."
        />
      </div>
      <button type="submit" class="btn food-item-btn btn-block text-white">Add Item</button>
    </form>
  </li>
</template>

<script>
export default {
  name: "MealComponent",
  props: ["mealData"],
  data() {
    return {
      newFoodItem: {
        profileId: this.$store.state.profile._id,
        foodName: "",
        details: ""
      }
    };
  },
  methods: {
    deleteMeal(mealId) {
      this.$store.dispatch("removeMeal", {
        mealId: mealId,
        tripId: this.$route.params.tripId
      });
    },
    addFoodItem(mealId) {
      let foodItem = { ...this.newFoodItem };
      let tripId = this.$route.params.tripId;
      this.$store.dispatch("addFoodItem", { mealId, foodItem, tripId });
      this.newFoodItem = {
        profileId: this.profile._id,
        foodName: "",
        details: ""
      };
    },
    deleteFoodItem(mealId, foodItemId) {
      this.$store.dispatch("removeFoodItem", {
        mealId,
        foodItemId,
        tripId: this.$route.params.tripId
      });
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style>
.food-item-ul {
  list-style: none;
}
.food-item-menu {
  font-size: 0.9em;
}
.food-item-details {
  font-size: 0.9em;
}
.food-item-author {
  font-size: 0.7em;
}
.food-item-btn {
  background: -webkit-linear-gradient(right, #d64eff, #8400ac);
}
.dropdown-menu {
  background-color: rgba(4, 4, 4, 0.75);
  border: 1px solid #ffa24b;
}
.dropdown-item {
  color: white;
}
.dropdown-item:hover {
  background-color: rgba(65, 65, 65, 0.75);
  color: white;
}
</style>