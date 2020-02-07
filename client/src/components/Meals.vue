<template>
  <div class="card-container">
    <div id="title-container" class="w-100 pointer" @click="dropdown = !dropdown">
      <div class="row">
        <div class="col-12">
          <!-- <br /> -->
          <div class="d-flex justify-content-center align-items-center">
            <h4 class="mb-0 mr-1">Shared Meals</h4>
            <span class="badge badge-primary badge-pill ml-1">{{meals.length}}</span>
          </div>
          <!-- <br /> -->
          <div v-if="!dropdown" class="arrow">
            <i class="fas fa-angle-double-down"></i>
          </div>
          <div v-else class="arrow">
            <i class="fas fa-angle-double-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dropdown" class="dropdown w-100 pb-1">
      <div class="col-12 col-md-8 mx-auto">
        <ul class="list-group list-group-flush">
          <MealComponent v-for="meal in meals" :key="meal._id" :mealData="meal" />
        </ul>
        <div class="row pt-3 pb-3">
          <div class="col-12 col-md-8 mx-auto">
            <button @click="addMeal()" class="btn-dark text-light-grey">Add Meal</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
import MealComponent from "@/components/MealComponent";
export default {
  name: "Meals",
  props: ["tripData"],
  mounted() {
    this.$store.dispatch("getMealsByTripId", this.$route.params.tripId);
  },
  data() {
    return {
      dropdown: false
    };
  },
  methods: {
    async addMeal() {
      let data = await NotificationService.inputMeal("Enter New Meal", {});
      if (data) {
        let meal = {
          ...data,
          foodItems: [],
          tripId: this.$route.params.tripId,
          tripAuthorId: this.tripData.authorId
        };
        this.$store.dispatch("addMeal", meal);
      }
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
#title-container h4 {
  color: black;
  cursor: pointer;
  padding: 1em 0;
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
.pointer {
  cursor: pointer;
}
.arrow {
  cursor: pointer;
  font-size: 1.5em;
  position: absolute;
  right: 7%;
  bottom: 1%;
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
.btn,
.badge-primary {
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
}
.text-light-grey {
  color: #ebe6e6;
}
</style>
