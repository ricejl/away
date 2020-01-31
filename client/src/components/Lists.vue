<template>
  <div class="card-container">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="mb-0">Custom Lists</h4>
        <span class="badge badge-primary badge-pill ml-1">{{lists.length}}</span>
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
      <div v-for="list in lists" :key="list._id" class="d-inline-block">{{list.title}}</div>
      <hr />
      <h5 class="pb-2">New list</h5>
      <div class="col-12">
        <form @submit.prevent="createList()" class="row list-form d-flex direction-column">
          <label for="list-name" class="col-5 pr-1">List name</label>
          <input
            type="text"
            id="list-name"
            class="col-5"
            v-model="newList.title"
            placeholder="Enter name"
            required
          />
          <button class="btn-dark mx-auto text-light-grey" type="submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lists",
  props: ["tripData"],
  mounted() {
    this.$store.dispatch("getListsByTripId", this.$route.params.tripId);
  },
  data() {
    return {
      newList: {
        title: "",
        tripId: this.$route.params.tripId
      },
      dropdown: false
    };
  },
  methods: {
    createList() {
      let list = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: ""
      };
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  }
};
</script>

<style scoped>
.card-container {
  background: rgba(232, 212, 180, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1em !important;
  min-height: 5em;
  cursor: pointer;
  margin: 0px 0px;
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
.badge-primary {
  border: 1px solid rgb(128, 128, 128);
  color: #fff;
  background-color: rgba(4, 0, 198, 0.5);
}
</style>