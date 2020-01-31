<template>
  <div class="members card-container">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="mb-0 mr-1">Members</h4>
        <span class="badge badge-primary badge-pill ml-1">
          {{
          members.length
          }}
        </span>
      </div>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>

    <div v-if="dropdown" class="dropdown pb-3">
      <div
        class="badge badge-dark p-3 font-size-pill mb-5 initials-overlap"
        v-for="(member, i) in members"
        :key="i"
      >
        {{ member.firstName[0] }}{{ member.lastName[0] }}
        <div class="first-name">{{ member.firstName }}</div>
      </div>
      <form @submit.prevent="addCollab">
        <label class="mr-md-1" for="email">
          <strong>Add a friend to this trip</strong>
        </label>
        <input
          class="bg-lightest-grey pl-1"
          type="text"
          name="email"
          v-model="newCollab.email"
          placeholder="Friend's email..."
        />
        <button class="btn-dark">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Members",
  mounted() {
    this.$store.dispatch("getTripById", this.$route.params.tripId);
  },
  params: ["tripData"],
  data() {
    return {
      newCollab: {
        email: "",
        tripId: this.$route.params.tripId
      },
      dropdown: false
    };
  },
  methods: {
    addCollab() {
      let tripId = this.$route.params.tripId;
      let collab = { ...this.newCollab };
      this.$store.dispatch("authenticateCollab", collab);
      this.newCollab = { email: "", tripId: this.$route.params.tripId };
    }
  },
  computed: {
    members() {
      return this.$store.state.activeTrip.collabsProfiles;
    }
  }
};
</script>

<style scoped>
/* .dropdown {
  transition: transform 1s ease-in-out;
}
.dropdown > div {
  transition-delay: 0.5s;
} */
.card-container {
  background: rgba(232, 212, 180, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  min-height: 5em;
  cursor: pointer;
}
.title-container {
  cursor: pointer;
  position: relative;
}
.arrow {
  font-size: 1.5em;
  position: absolute;
  right: 5%;
  bottom: 1%;
}
.down-arrow {
  position: absolute;
  right: 5%;
  bottom: 1%;
}
.up-arrow {
  position: absolute;
  right: 2%;
  top: 0;
}
.font-size-pill {
  font-size: 0.9em;
}
.bg-lightest-grey {
  background: #f3f3f3;
}
.badge-primary {
  border: 1px solid rgb(128, 128, 128);
  color: #fff;
  background-color: rgba(4, 0, 198, 0.5);
}
.badge-primary {
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
}
.initials-overlap {
  margin-right: -0.5em;
  position: relative;
  display: inline-block;
  border-radius: 50%;
  box-shadow: 0px 3px 8px -3px rgb(182, 181, 181), inset 0px 1px 3px #ebe6e6;
}
.initials-overlap:hover {
  background-color: #23272b;
  border-color: #1d2124;
}
.initials-overlap .first-name {
  visibility: hidden;
  background-color: #f3f3f3;
  color: var(--dark);
  text-align: center;
  border-radius: 6px;
  padding: 5px 1em;
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}
.initials-overlap .first-name::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #f3f3f3 transparent;
}
.initials-overlap:hover .first-name {
  visibility: visible;
  opacity: 0.9;
}
</style>
