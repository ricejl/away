<template>
  <div class="container-fluid profile">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="row">
      <div class="col-12 img-row-ht p-5 bg-green">
        <button
          id="create-profile-btn"
          v-if="!profile._id"
          @click="createProfile"
          class="btn"
        >Create Profile</button>
        <button v-else id="edit-profile-btn" @click="editProfile(profile)" class="btn">Edit Profile</button>
        <img
          class="profile-img"
          :src="
            profile.imgURL ||
              'https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png'
          "
          alt
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 pt-4">
        <h3>{{ profile.firstName }} {{ profile.lastName }}</h3>
        <p>"{{ profile.description || "Live, Laugh, Love" }}"</p>
      </div>
    </div>
    <hr />
    <div class="row pb-3">
      <div class="col-6">
        <h5>My Trips</h5>
        <ul class="list-group list-group-flush">
          <router-link
            v-for="trip in trips"
            :key="trip.id"
            :to="{ name: 'trip', params: { tripId: trip._id } }"
          >
            <li class="list-group-item list-group-item-action">{{ trip.title }}</li>
          </router-link>
        </ul>
      </div>

      <div class="col-6 vertical-line">
        <h5>Interests</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Interest One</li>
          <li class="list-group-item">Interest Two</li>
          <li class="list-group-item">Interest Three</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import NotificationService from "../NotificationService.js";

export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("resetActiveTrip");
    this.$store.dispatch("getProfileByUserId");
    this.$store.dispatch("getAllTrips");
  },
  components: { Navbar },
  methods: {
    async createProfile() {
      let profileData = await NotificationService.inputData("Profile", {});
      if (profileData) {
        this.$store.dispatch("createProfile", profileData);
        this.$store.state.user.hasProfile = true;
        this.$store.dispatch("updateUserHasProfile");
      }
    },
    async editProfile(profile) {
      let profileData = await NotificationService.inputData("Profile", profile);
      if (profileData) {
        this.$store.dispatch("editProfile", {
          profileId: profile._id,
          update: profileData
        });
      }
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    trips() {
      return this.$store.state.trips;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.img-row-ht {
  min-height: 35vh;
}
.bg-green {
  background: rgba(40, 46, 36, 0.2);
}
.vertical-line {
  border-left: 1.5px solid rgba(255, 162, 75, 0.5);
}
hr {
  border-color: rgba(255, 162, 75, 0.6);
}
#create-profile-btn,
#edit-profile-btn {
  background-color: rgba(4, 4, 4, 0.5);
  border: 1px solid #ffa24b;
  color: white;
  letter-spacing: 2px;
  position: absolute;
  top: 5%;
  right: 2%;
}
.profile-img {
  max-width: 12em;
}
</style>
