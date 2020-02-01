<template>
  <div class="card-container">
    <div class="w-100 title-container" @click="dropdown = !dropdown">
      <br />
      <div class="d-flex justify-content-center align-items-center">
        <h4 class="mb-0">Carpool</h4>
        <span class="badge badge-primary badge-pill ml-1">{{carpools.length}}</span>
      </div>
      <br />
      <div class="arrow down-arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow up-arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>

    <div v-if="dropdown" class="dropdown pb-3">
      <div v-for="carpool in carpools" :key="carpool._id" class="d-inline-block">
        <div class="p-3">
          <h6 class="car-name bg-lightest-grey mb-0 pt-2 pl-1 pr-1">
            {{ carpool.name }}
            <i
              @click="removeCarpool(carpool._id)"
              class="text-right fas fa-times"
            ></i>
          </h6>
          <div class="car d-flex justify-content-center bg-lightest-grey text-light p-1">
            <div
              v-for="occupant in carpool.occupants"
              :key="occupant.profileId._id"
              class="bg-dark shadow-dark seat m-1 d-flex align-items-center justify-content-center"
              title="occupant.name"
            >
              <i
                @click="removeOccupant(carpool._id, occupant._id, occupant.profileId._id, carpool.authors)"
                class="fas fa-times"
              ></i>
              {{ occupant.profileId.firstName[0] }}{{ occupant.profileId.lastName[0] }}
            </div>
            <div
              v-for="(freeSeats, i) in carpool.totalSeats -
                carpool.occupants.length"
              :key="i"
              @click="addOccupant(tripData._id, carpool._id)"
              class="bg-light-grey seat m-1 d-flex justify-content-center align-items-center"
            >
              <i class="fas fa-plus color-light-grey"></i>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <h5 class="pb-2">New carpool</h5>
      <div class="col-12">
        <button @click="createCarpool()" class="btn-dark mx-auto text-light-grey">Add</button>
      </div>
    </div>
    <div
      v-if="dropdown"
      @click="dropdown = !dropdown"
      class="w-100 text-right arrow bottom-up-arrow"
    >
      <i class="fas fa-angle-double-up mr-3"></i>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import NotificationService from "@/NotificationService";
export default {
  name: "Carpool",
  props: ["tripData"],
  mounted() {
    this.$store.dispatch("getProfileByUserId");
    this.$store.dispatch("getCarpoolsByTripId", this.$route.params.tripId);
  },
  data() {
    return {
      dropdown: false
    };
  },
  methods: {
    async createCarpool() {
      let data = await NotificationService.inputCar("Car Details");
      let carpool = {
        ...data,
        tripId: this.$route.params.tripId,
        tripAuthorId: this.tripData.authorId
      };
      this.$store.dispatch("addCarpool", { tripId: carpool.tripId, carpool });
    },
    addOccupant(tripId, carpoolId) {
      console.log("carpool id from add occupant", carpoolId);
      let occupant = { profileId: this.$store.state.profile._id };
      this.$store.dispatch("addOccupant", { tripId, carpoolId, occupant });
    },
    removeOccupant(carpoolId, occupantId, occupantProfileId, carpoolAuthors) {
      let tripId = this.$route.params.tripId;
      if (
        this.$store.state.profile._id == occupantProfileId ||
        carpoolAuthors.includes(this.$store.state.user._id)
      ) {
        this.$store.dispatch("removeOccupant", {
          tripId,
          carpoolId,
          occupantId
        });
      } else
        NotificationService.errorMessage(
          "You can't remove this person from a carpool"
        );
    },
    async removeCarpool(carpoolId) {
      Swal.fire({
        title: "Are You Sure You Want To Delete This Carpool?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          let tripId = this.$route.params.tripId;
          this.$store.dispatch("removeCarpool", { tripId, carpoolId });
          Swal.fire("Deleted!", "Your carpool has been deleted.", "success");
        }
      });
    }
  },
  computed: {
    carpools() {
      return this.$store.state.carpools;
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
  margin: 0px 0px;
}
.title-container {
  cursor: pointer;
  position: relative;
}
.top-card {
  background: rgba(255, 162, 75, 0.75) !important;
}
.arrow {
  font-size: 1.5em;
}
.down-arrow {
  position: absolute;
  right: 2%;
  top: 1%;
}
.up-arrow {
  position: absolute;
  right: 2%;
  top: 1%;
}
.bottom-up-arrow {
  cursor: pointer;
}
.car-name {
  max-width: 10em;
}
.bg-lightest-grey {
  background-color: #f3f3f3;
}
.bg-light-grey {
  background-color: #ebe6e6;
  box-shadow: 1px 1px 2px #d8d4d4;
}
.color-light-grey {
  color: #d8d4d4;
}
.shadow-dark {
  box-shadow: 1px 1px 2px var(--secondary);
}
.car {
  max-width: 10em;
  flex-wrap: wrap;
}
.seat {
  height: 4em;
  width: 4em;
}
.badge-primary {
  border: 1px solid rgb(128, 128, 128);
  color: #fff;
  background-color: rgba(4, 0, 198, 0.5);
}
input,
.btn,
.badge-primary {
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.05);
}
</style>
