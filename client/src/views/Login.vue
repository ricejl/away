<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-12 fakenavbar">
        <img class="away-logo mt-1" src="../assets/away-logo-white.svg" alt />
      </div>
    </div>
    <div class="row pt-5">
      <div class="col-10 col-md-6 mx-auto login-container">
        <div class="row">
          <div class="col-10 col-md-8 mx-auto text-center pb-4">
            <!-- LOGIN FORM -->
            <form v-if="loginForm" @submit.prevent="loginUser">
              <div class="form-group">
                <input type="email" v-model="creds.email" class="form-control" placeholder="Email" />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="creds.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <button>Log in</button>
            </form>
            <!-- REGISTRATION FORM -->
            <form v-else @submit.prevent="register">
              <div class="form-group">
                <input
                  type="email"
                  v-model="newUser.email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  v-model="newUser.password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <button>Register</button>
            </form>
          </div>
          <div @click="loginForm = !loginForm" class="col-12 text-center hoverhand">
            <p v-if="loginForm">click here to register</p>
            <p v-else>click here to login</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        hasProfile: false
      }
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
      // this.newUser = {
      //   email: "",
      //   password: "",
      //   hasProfile: false
      // };
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style scoped>
.hoverhand {
  cursor: pointer;
}
.away-logo {
  height: 9vh;
}
.fakenavbar {
  height: 10vh;
  background-color: black;
  color: white;
}
.login {
  background: url("https://images.unsplash.com/photo-1552055568-e9943cd2a08f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80")
    no-repeat center;
  background-size: cover;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}
.login-container {
  background: rgba(235, 230, 230, 0.75);
  padding: 3em 1em 0em 1em;
}
form button {
  background: rgba(255, 162, 75, 0.8);
  border: 1px solid rgb(255, 162, 75);
  font-size: 1.4em;
  margin-top: 1em;
  padding: 0.45em 1em;
}
</style>
