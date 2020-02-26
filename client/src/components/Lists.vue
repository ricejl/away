<template>
  <div class="card-container">
    <div id="title-container" class="w-100" @click="dropdown = !dropdown">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center align-items-center">
            <h4 class="mb-0">Custom Lists</h4>
            <span class="badge badge-primary badge-pill ml-1">{{lists.length}}</span>
          </div>
          <div class="arrow" v-if="!dropdown">
            <i class="fas fa-angle-double-down"></i>
          </div>
          <div v-else class="arrow">
            <i class="fas fa-angle-double-up"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dropdown" class="dropdown pb-3">
      <div
        v-for="list in lists"
        :key="list._id"
        class="list d-inline-block bg-lightest-grey m-3 p-3 align-top"
      >
        <h6 class="list-name mb-0">
          <b>
            {{list.title}}
            <i
              @click="removeList(list._id)"
              class="fas fa-times delete-list"
              title="delete list"
            ></i>
          </b>
        </h6>
        <hr class="hr-thick" />
        <div v-for="item in list.items" :key="item._id" class="list-item">
          <span class="pr-2">{{item.itemName}}</span>
          <i
            @click="removeListItem(list._id, item._id, item.profileId._id, list.authors)"
            class="far fa-times-circle remove-list-item"
            title="remove item"
          ></i>
          <p class="food-item-author mb-0 align-self-center">&nbsp;by: {{item.profileId.firstName}}</p>
        </div>
        <button class="btn-dark mx-auto text-light-grey mt-3" @click="addItem(list._id)">Add Item</button>
      </div>

      <hr id="bottom-hr-width" />
      <form @submit.prevent="createList()" class="pr-3 pl-3">
        <label for="list-name" class="mr-sm-2">
          <strong>Create a new list</strong>
        </label>
        <div>
          <input
            type="text"
            id="list-name"
            class="bg-lightest-grey"
            v-model="newList.title"
            placeholder="Enter name"
            required
          />
          <button class="btn-dark mx-auto text-light-grey" type="submit">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
import Swal from "sweetalert2";

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
        tripId: this.$route.params.tripId,
        tripAuthorId: this.tripData.authorId
      },
      newItem: {
        itemName: "",
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
        tripId: this.$route.params.tripId,
        tripAuthorId: this.tripData.authorId
      };
    },
    removeList(listId) {
      Swal.fire({
        title: "Are You Sure You Want To Delete This List?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          let tripId = this.$route.params.tripId;
          this.$store.dispatch("removeList", { listId, tripId });
        }
      });
    },
    createListItem(listId) {
      let listItem = { ...this.newItem };
      let tripId = this.$route.params.tripId;
      listItem.profileId = this.$store.state.profile._id;

      this.$store.dispatch("addListItem", { listId, listItem, tripId });
      this.newItem = {
        itemName: "",
        tripId: this.$route.params.tripId,
        profileId: ""
      };
    },
    removeListItem(listId, listItemId, listItemProfileId, listAuthors) {
      let tripId = this.$route.params.tripId;
      if (
        this.$store.state.profile._id == listItemProfileId ||
        listAuthors.includes(this.$store.state.user._id)
      ) {
        this.$store.dispatch("removeListItem", { listId, listItemId, tripId });
      } else
        NotificationService.errorMessage(
          "You can't remove this item from the list"
        );
    },
    async addItem(listId) {
      let data = await NotificationService.inputListItem("Enter New Item", {});
      if (data) {
        let listItem = {
          ...data,
          profileId: this.$store.state.profile._id
        };
        let tripId = this.$route.params.tripId;
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
#title-container h4 {
  color: black;
  cursor: pointer;
  padding: 1em 0;
}
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
  right: 7%;
  bottom: 1%;
}
.list {
  position: relative;
  box-shadow: 1px 3px 9px black;
}
.delete-list {
  opacity: 0.3;
  position: absolute;
  right: 0.5em;
}
.delete-list:hover {
  opacity: 0.7;
}
.list-item {
  position: relative;
}
.remove-list-item {
  position: absolute;
  top: 0.4em;
  opacity: 0.3;
  font-size: 0.9em;
}
.remove-list-item:hover {
  opacity: 0.7;
}
.bg-lightest-grey {
  background: #f3f3f3;
}
.badge-primary {
  border: 1px solid rgb(128, 128, 128);
  color: #fff;
  background-color: rgba(4, 0, 198, 0.5);
}
#bottom-hr-width {
  max-width: 90%;
}
</style>