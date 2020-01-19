<template>
  <div class="account container-fluid">
    <div class="row">
      <div class="col-12">
        <Navbar />
      </div>
    </div>
    <div class="row pt-2">
      <div class="col-12 col-md-6 mx-auto">
        <form class="account-form text-left mb-1">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Password" />
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" class="form-control" placeholder="Password" />
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form-control" placeholder="Password" />
          </div>
          <div class="text-center">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <img
          class="compass-img animated rotateIn"
          src="http://www.pngall.com/wp-content/uploads/2017/03/Compass-Transparent.png"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Account",
  mounted() {
    this.$store.dispatch("getProfileByUserId");
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  components: {
    Navbar
  }
};
</script>

<style scoped>
.account {
  background: linear-gradient(
      rgba(255, 255, 255, 0.35),
      rgba(255, 255, 255, 0.35)
    ),
    url("https://images.unsplash.com/photo-1520299607509-dcd935f9a839?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80")
      no-repeat center;
  background-size: cover;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}
.profile-img {
  max-width: 5em;
}

.change-img-btn {
  background-color: rgba(4, 4, 4, 0.5);
  border: 1px solid #ffa24b;
  color: white;
  letter-spacing: 2px;
}

.account-form {
  color: black;
}

label {
  font-size: 1.1em;
  font-weight: bold;
}

.account-form button {
  background: rgba(4, 0, 198, 0.8);
  border: none;
  color: white;
  font-size: 1em;
  padding: 0.45em 1em;
}

.compass-img {
  max-width: 10em;
  animation-iteration-count: 3;
}
</style>