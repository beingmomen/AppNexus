<template>
  <div class="flex justify-center items-start mt-12 h-screen">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <fa-icon :icon="['fas', 'user']" class="fa-xl" />
        </div>
        <div class="stat-title">Total Admins</div>
        <div class="stat-value text-primary">{{ counts[0] }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <fa-icon :icon="['fas', 'list']" class="fa-xl" />
        </div>
        <div class="stat-title">Total Categories</div>
        <div class="stat-value text-secondary">{{ counts[1] }}</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-primary">
          <fa-icon :icon="['fas', 'robot']" class="fa-xl" />
        </div>
        <div class="stat-title">Total Apps</div>
        <div class="stat-value text-primary">{{ counts[2] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/plugins/firebase.js";
const counts = ref([]);

const allCollectionsCount = () => {
  const cols = ["admins", "categories", "apps"];
  cols.forEach(async (x) => {
    const col = await collection(db, x);
    const snapShot = await getCountFromServer(col);
    const total = await snapShot.data().count;
    counts.value.push(total);
  });
};
allCollectionsCount();
</script>
