<template>
  <section class="mt-10">
    <div class="flex justify-between items-center sm:flex-row flex-col mb-5">
      <div class="form-control mb-3">
        <div class="input-group">
          <input
            v-model="searchText"
            type="text "
            :placeholder="$t('search')"
            class="input input-bordered border-radius-start"
            @input="fetchDataByQuery('resetSearch', searchText)"
          />
          <button
            class="btn btn-square border-radius-end"
            @click="fetchDataByQuery('search', searchText)"
          >
            <fa-icon :icon="['fas', 'magnifying-glass']" class="fa-xl" />
          </button>
        </div>
      </div>

      <label
        v-if="action"
        for="my-modal-5"
        class="btn gap-2 z-0 bg-primary-focus hover:bg-primary border-0"
      >
        <fa-icon :icon="['far', 'square-plus']" class="fa-xl" />
        {{ $t("create") }}
      </label>

      <Modal
        id="my-modal-5"
        width="w-11/12 max-w-5xl"
        :title="`${$t('create')} ${title}`"
        :ok="$t('create')"
        :loading="dataTable.loading"
        :progress="dataTable.progress"
        @ok="addDocument"
      >
        <template #content>
          <slot name="form" />
        </template>
      </Modal>
    </div>

    <div class="overflow-x-auto mb-10">
      <table class="table w-full mb-10">
        <!-- head -->
        <thead>
          <tr>
            <th v-for="{ key, name } in cols" :key="key">{{ name }}</th>
            <th v-if="action">{{ $t("actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="row in dataTable.allData" :key="row.id">
            <td v-for="{ key } in cols" :key="key">
              <div v-if="key == 'logo' || key == 'image'" class="avatar">
                <div class="w-12 rounded-full">
                  <img :src="row[key]" />
                </div>
              </div>
              <span v-else-if="key == 'category'">
                {{ categoryFormat(row[key]) }}
              </span>
              <span v-else>{{ row[key] }}</span>
            </td>
            <td v-if="action">
              <label
                :for="`patch-${row.id}`"
                class="cursor-pointer"
                @click="fetchDocument(row)"
              >
                <fa-icon
                  :icon="['fas', 'pen-to-square']"
                  class="fa-xl mx-2 text-sky-700"
                />
              </label>
              <label :for="`del-${row.id}`" class="cursor-pointer">
                <fa-icon
                  :icon="['fas', 'trash-can']"
                  class="fa-xl mx-2 text-rose-700"
                />
              </label>
            </td>
            <Modal
              :id="`del-${row.id}`"
              :title="$t('del_confirm')"
              :ok="$t('ok')"
              @ok="deleteDocument(row.id)"
            >
              <template #content>
                <p class="py-4">
                  {{ $t("del_msg") }}
                  {{ row.name }}
                </p>
              </template>
            </Modal>
            <Modal
              :id="`patch-${row.id}`"
              width="w-11/12 max-w-5xl"
              :title="`${$t('update')} ${title}`"
              :ok="$t('update')"
              @ok="updateDocument(row.id)"
              @closeModal="closeModal"
            >
              <template #content>
                <slot name="form" />
              </template>
            </Modal>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        <div class="btn-group">
          <button
            :disabled="disabledBtn"
            class="btn border-radius-start"
            :class="{ 'btn-disabled': currentPage <= 1 }"
            @click="changePage('back'), currentPage--"
          >
            ??
          </button>
          <button class="btn">
            <!-- {{ dataTable.totalItems }} | -->

            {{ $t("page") }} {{ currentPage }}
          </button>
          <button
            :disabled="disabledBtn"
            class="btn border-radius-end"
            :class="{ 'btn-disabled': currentPage >= dataTable.totalPages }"
            @click="changePage('next'), currentPage++"
          >
            ??
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import useFirebase from "@/hooks/useFirebase";
import { useStore } from "vuex";
const {
  fetchData,
  fetchDataByQuery,
  fetchDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  getDoc,
  doc,
  db,
} = useFirebase(props.moduleName);
const store = useStore();
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  cols: {
    type: Array,
    default: null,
  },
  moduleName: {
    type: String,
    default: null,
  },
  action: {
    type: Boolean,
    default: true,
  },
});

let currentPage = ref(1);
let searchText = ref();
let disabledBtn = ref(false);

const dataTable = computed(() => {
  return store.getters[`${props.moduleName}/table`];
});

onBeforeMount(() => {
  fetchData();
});

const changePage = async (dir) => {
  disabledBtn.value = await true;
  await fetchDataByQuery(dir);
  await setTimeout(async () => {
    disabledBtn.value = await false;
  }, 1000);
};

const closeModal = () => {
  store.dispatch(`${props.moduleName}/resetFields`);
};
</script>



<style lang="scss" scoped></style>
