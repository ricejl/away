<template>
  <li class="list-group-item">
    <div class="d-flex justify-content-start align-items-center">
      <div class="btn-group dropright">
        <button type="button" class="btn" data-toggle="dropdown">
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="dropdown-menu">
          <button @click="editMeal(mealData)" class="dropdown-item">Edit</button>
          <button @click="deleteMeal(mealData._id)" class="dropdown-item">Delete</button>
          <button @click="addFoodItem(mealData)" class="dropdown-item">Add Food Item</button>
        </div>
      </div>
      <h3 class="mb-0">{{mealData.title}}</h3>
    </div>
    <div class="text-left ml-5">
      <p v-if="mealData.details" class="details mb-0">*{{mealData.details}}*</p>
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
          <span class="pr-2">{{foodItem.foodName}}</span>
          <p
            class="food-item-author mb-0 align-self-center"
          >-&nbsp;Added by: {{foodItem.profileId.firstName}}</p>
        </div>
        <div class="text-left ml-5">
          <p v-if="foodItem.details" class="details mb-0">*{{foodItem.details}}*</p>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
import NotificationService from "../NotificationService";
export default {
  name: "MealComponent",
  props: ["mealData"],
  data() {
    return {};
  },
  methods: {
    deleteMeal(mealId) {
      this.$store.dispatch("removeMeal", {
        mealId: mealId,
        tripId: this.$route.params.tripId
      });
    },
    async editMeal(mealData) {
      let data = await NotificationService.inputMeal("Edit Meal", mealData);
      let meal = {
        ...data,
        tripId: this.$route.params.tripId
      };
      this.$store.dispatch("editMeal", { mealId: mealData._id, update: meal });
    },
    async addFoodItem(meal) {
      let foodItem = await NotificationService.inputFood("Add Food Item", meal);
      if (foodItem) {
        foodItem.profileId = this.$store.state.profile._id;
        let tripId = this.$route.params.tripId;
        this.$store.dispatch("addFoodItem", {
          mealId: meal._id,
          foodItem,
          tripId
        });
      }
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
.details {
  font-size: 0.8em;
}
.food-item-author {
  font-size: 0.65em;
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