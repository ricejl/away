<template>
  <div class="card-container">
    <div class="w-100" @click="dropdown = !dropdown">
      <br />
      <h4 class="mb-0">Carpool</h4>
      <br />
      <div class="arrow" v-if="!dropdown">
        <i class="fas fa-angle-double-down"></i>
      </div>
      <div v-else class="arrow">
        <i class="fas fa-angle-double-up"></i>
      </div>
    </div>

    <!-- <transition name="slide"> -->
    <div v-if="dropdown" class="dropdown pb-3">
      <div
        v-for="carpool in trip.carpools"
        :key="carpool._id"
        class="d-inline-block"
      >
        <div class="p-3">
          <h6 class="car-name bg-lightest-grey mb-0 pt-2">
            {{ carpool.name }}
          </h6>
          <div
            v-for="occupant in carpool.occupants"
            :key="occupant._id"
            class="car d-flex justify-content-center bg-light text-light p-1"
          >
            <div class="bg-dark shadow-dark seat m-1">
              {{ occupant.name[0] }}
            </div>
            <!-- <div class="bg-dark shadow-dark seat m-1"></div>
            <div class="bg-dark shadow-dark seat m-1"></div>
            <div class="bg-dark shadow-dark seat m-1"></div>
            <div class="bg-dark shadow-dark seat m-1"></div> -->
            <div
              @click="addOccupant(tripData._id, carpool._id)"
              class="bg-light-grey seat m-1 d-flex justify-content-center align-items-center"
            >
              <span>
                <i class="fas fa-plus color-light-grey"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ carpool.name }}
        NOTE use carpool.totalSeats to determine number of seat divs
        totalSeats - occupants.length = number of remaining seats
        carpool.description is optional - may wanna display on click to keep it looking clean if added to form
        Stretch goal - use drag and drop library -->

      <div class="d-inline-block p-3">
        <h6 class="car-name bg-lightest-grey mb-0 pt-2">car</h6>
        <div class="car d-flex justify-content-center bg-light p-1">
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
        </div>
      </div>
      <div class="d-inline-block p-3">
        <h6 class="car-name bg-lightest-grey mb-0 pt-2">car</h6>
        <div class="car d-flex justify-content-center bg-light p-1">
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
          <div class="bg-dark shadow-dark seat m-1"></div>
        </div>
      </div>
      <hr />
      <h5 class="pb-2">New carpool</h5>
      <form
        @submit.prevent="createCarpool(tripData._id)"
        class="carpool-form d-flex direction-column"
      >
        <label for="carpool-name" class="pr-1">Carpool name</label>
        <input
          type="text"
          id="carpool-name"
          v-model="newCarpool.name"
          placeholder="Enter name"
        />
        <label for="carpool-total-seats" class="pl-2 pr-1"
          >Number of seats</label
        >
        <input
          type="number"
          min="0"
          v-model="newCarpool.totalSeats"
          placeholder="Total number of seats"
        />
        <button type="submit">Add</button>
      </form>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: "Carpool",
  props: ["tripData"],
  mounted() {
    this.$store.dispatch("getCarpoolsByTripId", this.$route.params.tripId);
  },
  data() {
    return {
      newCarpool: {
        name: "",
        totalSeats: 0
      },
      dropdown: false
    };
  },
  methods: {
    createCarpool(tripId) {
      let carpool = { ...this.newCarpool };
      this.$store.dispatch("addCarpool", { tripId, carpool });
      this.newCarpool = {
        name: "",
        totalSeats: 0
      };
    },
    addOccupant(tripId, carpoolId) {
      let occupant = { occupants: this.$store.state.profile._id };
      this.$store.dispatch("addOccupant", { tripId, carpoolId, occupant });
    }
  },
  computed: {
    trip() {
      return this.$store.state.activeTrip;
    }
  }
};
</script>

<style scoped>
/* .slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.5s ease;
} */
.dropdown {
  /* transform: translateX(-100%); */
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
.top-card {
  background: rgba(255, 162, 75, 0.75) !important;
}
.arrow {
  font-size: 1.5em;
  position: absolute;
  right: 5%;
  bottom: 1%;
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
</style>
