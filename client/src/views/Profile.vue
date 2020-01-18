<template>
  <div class="container-fluid profile">
    <div class="row">
      <div class="col-12">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="row">
      <div class="col-12 img-row-ht p-5 bg-green">
        <button id="profile-btn" v-if="!profile._id" @click="createProfile">Complete Profile</button>
        <i class="fas fa-user fa-8x"></i>
      </div>
    </div>
    <div class="row">
      <div class="col-12 pt-4">
        <h3>{{ profile.name }}</h3>
        <p>"Live, Laugh, Love"</p>
      </div>
    </div>
    <hr />
    <div class="row pb-3">
      <div class="col-6">
        <h5>My Trips</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          provident unde nam aspernatur illo!
        </p>
      </div>

      <div class="col-6 vertical-line">
        <h5>Interests</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quas
          quam provident ullam, aut sed velit facere molestias voluptate
          corrupti deleniti ex? Ipsam, aperiam cum! Praesentium quaerat quos ab
          vel!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import NotifcationService from "../NotifcationService.js";
import NotificationService from "../NotifcationService.js";

export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("getProfileByUserId");
  },
  components: { Navbar },
  methods: {
    async createProfile() {
      let profileData = await NotificationService.inputData("Profile");
      if (profileData) {
        console.log(profileData);

        this.$store.dispatch("createProfile", profileData);
        // reset data fields to blank
      }
    },
    profileExists() {
      if (profile._id) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    profile() {
      // FIXME profile disappears from page and store on refresh
      return this.$store.state.profile;
    }
  }
};
</script>

<style>
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

#profile-btn {
  position: absolute;
  top: 5%;
  right: 2%;
}
</style>
