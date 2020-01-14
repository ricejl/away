<template>
  <div class="login container-fluid">
    <div class="row">
      <div class="col-12 fakenavbar">
        <div class="appName">away</div>
      </div>
    </div>
    <div class="row pt-5">
      <div class="col-10 col-md-6 mx-auto login-container">
        <div class="row">
          <div class="col-10 col-md-8 mx-auto text-center pb-4">
            <form>
              <div class="form-group">
                <input type="email" class="form-control" placeholder="Email" />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
              <button>Login</button>
            </form>
          </div>
          <div class="col-12 text-center">
            <p>click here to register</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style>
.appName {
  margin-top: -0.5rem;
  font-size: 3rem;
  font-family: "Great Vibes", sans-serif;
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
  background: rgba(4, 0, 198, 0.5);
  border: none;
  font-size: 1.4em;
  margin-top: 1em;
  padding: 0.45em 1em;
}
</style>
