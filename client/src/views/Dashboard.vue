<template>
  <div class="dashboard container-fluid">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="row justify-content-around">
      <div class="col-12 col-md-6 col-lg-3" v-for="trip in trips" :key="trip._id">
        <router-link :to="{name: 'trip', params: {tripId: trip._id}}">
          <div class="card-container">
            <h1 class="mb-0">{{trip.title}}</h1>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card-container">
          <form @submit.prevent="createTrip">
            <input
              type="text"
              v-model="newTrip.title"
              class="form-control mx-auto"
              placeholder="New Trip Name"
              required
            />
            <button class="mb-0">
              <i class="fas fa-plus"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import NotificationService from "../NotifcationService.js";
export default {
  name: "Dashboard",
  mounted() {
    this.$store.dispatch("getAllTrips");
  },
  data() {
    return {
      newTrip: {
        title: ""
      }
    };
  },
  computed: {
    trips() {
      return this.$store.state.trips;
    }
  },
  components: {
    Navbar
  },
  methods: {
    async createTrip() {
      await this.$store.dispatch("getProfileByUserId");
      if (this.$store.state.profile._id) {
        this.$store.dispatch("createTrip", this.newTrip);
        this.newTrip = { title: "" };
      } else {
        await NotificationService.errorMessage(
          "You must have a profile to create a trip"
        );
      }
    }
  }
};
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
.dashboard {
  background: url("https://images.unsplash.com/photo-1473772564351-202a22a93101?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=671&q=80")
    no-repeat center;
  background-size: cover;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}
.card-container {
  background: rgba(232, 212, 180, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  min-height: 10em;
  min-width: 10em;
}
form input {
  max-width: 90%;
}
form button {
  background: rgba(4, 0, 198, 0.5);
  border: none;
  font-size: 1.4em;
  margin-top: 1em;
  padding: 0.45em 1em;
}
</style>
