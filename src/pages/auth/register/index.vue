<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Sign Up Now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              class="input input-bordered"
              v-model="data.displayName"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              class="input input-bordered"
              v-model="data.email"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              class="input input-bordered"
              v-model="data.password"
            />
          </div>
          <div class="form-control mt-6">
            <button
              class="btn btn-primary"
              @click="dispatchAction('auth/createUser', data)"
            >
              Sign Up
            </button>
          </div>
          <label class="label justify-center">
            <router-link to="/auth/login" class="label-text-alt link link-hover"
              >Login Insted</router-link
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, reactive } from "vue";
import useStoreFun from "../../../hooks/useStoreFun";
const { dispatchAction } = useStoreFun();

const data = reactive({
  displayName: null,
  email: null,
  password: null,
  returnSecureToken: true,
});
</script>
  
  <style lang="scss" scoped>
</style>