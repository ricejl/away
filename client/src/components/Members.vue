<template>
  <div class="members card-container">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="mb-0">Members</h4>
        <span class="badge badge-primary badge-pill ml-1">{{members.length}}</span>
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
      <div v-for="(member, i ) in members" :key="i">{{member.firstName[0]}}{{member.lastName[0]}}</div>
      <form @submit.prevent="addCollab">
        <label class="text-white" for="email">Add a friend to this trip...</label>
        <input type="text" name="email" v-model="newCollab.email" placeholder="Enter an email..." />
        <button>Add</button>
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
.dropdown {
  transition: transform 1s ease-in-out;
}
.dropdown > div {
  transition-delay: 0.5s;
}
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
</style>