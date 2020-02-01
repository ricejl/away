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
      <div
        v-for="list in lists"
        :key="list._id"
        class="d-inline-block bg-lightest-grey m-3 p-3 align-top"
      >
        <div class="p-3">
          <h6 class="list-name mb-0 pt-2">
            <b>
              {{list.title}}
              <i @click="removeList(list._id)" class="text-right fas fa-times"></i>
            </b>
          </h6>
          <hr class="hr-thick" />
          <div v-for="item in list.items" :key="item._id">
            {{ item.itemName }}
            <i
              @click="removeListItem(list._id, item._id)"
              class="text-right fas fa-times"
            ></i>
          </div>
          <button class="btn-dark mx-auto text-light-grey mt-3" @click="addItem(list._id)">Add Item</button>
          <!-- <form
            @submit.prevent="createListItem(list._id)"
            class="row list-form d-flex direction column mt-3"
          >
            <input
              type="text"
              id="item-name"
              class="col-8"
              v-model="newItem.itemName"
              placeholder="Enter item"
              required
            />
            <button class="btn-dark mx-auto text-light-grey" type="submit">Add</button>
          </form>-->
        </div>
      </div>
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
import NotificationService from "../NotificationService.js";

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
      newItem: {
        itemName: "",
        // profileId: this.$state.store.profile._id
        profileId: ""
      },
      dropdown: false
    };
  },
  methods: {
    createList() {
      let list = { ...this.newList };
      this.$store.dispatch("addList", list);
      this.newList = {
        title: "",
        tripId: this.$route.params.tripId
      };
    },
    removeList(listId) {
      if (confirm("Are You Sure You Want To Delete This List?")) {
        let tripId = this.$route.params.tripId;
        this.$store.dispatch("removeList", { listId, tripId });
      }
    },
    // NOTE Depreciated
    // createListItem(listId) {
    //   let listItem = { ...this.newItem };
    //   let tripId = this.$route.params.tripId;
    //   listItem.profileId = this.$store.state.profile._id;
    //   // console.log("listItem is:", listItem);
    //   // NOTE the below has to have the same name as the action in the store
    //   this.$store.dispatch("addListItem", { listId, listItem, tripId });
    //   this.newItem = {
    //     itemName: "",
    //     tripId: this.$route.params.tripId,
    //     profileId: ""
    //   };
    // },
    removeListItem(listId, listItemId) {
      if (confirm("Are You Sure You Want To Delete This Item?")) {
        let tripId = this.$route.params.tripId;
        this.$store.dispatch("removeListItem", { listId, listItemId, tripId });
      }
    },
    async addItem(listId) {
      let data = await NotificationService.inputListItem("Enter New Item", {});
      if (data) {
        let listItem = {
          ...data,
          profileId: this.$store.state.profile._id
        };
        let tripId = this.$route.params.tripId;

        console.log("addItem says listItem is: ", listItem);
        this.$store.dispatch("addListItem", { listId, listItem, tripId });
      }
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
    profile() {
      return this.$store.state.profile;
    }
  }
};
</script>

<style scoped>
.hr-thick {
  border-width: 3px;
  border-color: black;
}
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
.bg-lightest-grey {
  background-color: #f3f3f3;
}
.list-name {
  width: 15em;
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