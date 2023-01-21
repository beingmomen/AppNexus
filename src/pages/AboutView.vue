<template>
  <div class="about">
    <input
      v-model="name1"
      type="text"
      placeholder="Type name here"
      class="input w-full max-w-xs"
    />
    <br />
    <input
      v-model="age1"
      type="text"
      placeholder="Type age here"
      class="input w-full max-w-xs"
    />
    <br />
    <!-- <h1>This is an about page</h1> -->
    <p>Name : {{ name }}</p>
    <p>Age : {{ age }}</p>

    <div class="btn-group">
      <button class="btn" @click="changeName">Change Name</button>
      <button class="btn" @click="changeAge">Change Age</button>
    </div>

    <!-- <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ user.name }}</p>
    <p>{{ user.age }}</p>

    <br />

    <div class="btn-group">
      <button class="btn" @click="changeName">Change Name</button>
      <button class="btn" @click="changeAge">Change Age</button>
    </div> -->
  </div>
</template>


<script setup>
import useStoreFun from "../hooks/useStoreFun";
const { name1, age1, name, age, changeName, changeAge } = useStoreFun();

// Test

// const firstName = ref("Abdelmomen");
// const lastName = ref("Elshatory");
// const user = reactive({
//   name: "momen",
//   age: 25,
// });

// function changeName() {}

// const changeName = () => {
//   firstName.value = "Essa";
// };

// setTimeout(() => {
//   user.name = "Abdelmomen";
//   user.age = 30;
// }, 2000);
</script>


<!-- <script>
export default {
  data() {
    return {
      name1: null,
      age1: null,
    };
  },
  computed: {
    name() {
      return this.$store.getters["name"];
    },
    age() {
      return this.$store.getters["categories/age"];
    },
  },
  methods: {
    changeName() {
      this.$store.dispatch("name", this.name1);
    },
    changeAge() {
      this.$store.dispatch("categories/age", this.age1);
    },
  },
};
</script> -->

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
