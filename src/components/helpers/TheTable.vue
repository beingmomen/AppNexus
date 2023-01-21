<template>
  <section class="mt-10">
    <div class="flex justify-between mb-5">
      <div class="form-control">
        <div class="input-group">
          <input
            type="text"
            placeholder="Search…"
            class="input input-bordered"
          />
          <button class="btn btn-square">
            <fa-icon :icon="['fas', 'magnifying-glass']" class="fa-xl" />
          </button>
        </div>
      </div>

      <label for="my-modal-5" class="btn gap-2">
        <fa-icon :icon="['far', 'square-plus']" class="fa-xl" />
        {{ $t("create") }}
      </label>

      <Modal
        id="my-modal-5"
        width="w-11/12 max-w-5xl"
        :title="`${$t('create')} ${$t('category')}`"
        :ok="$t('create')"
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
            <th>{{ $t("actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="row in dataTable.allData" :key="row.id">
            <td v-for="{ key } in cols" :key="key">{{ row[key] }}</td>
            <td>
              <label
                :for="`patch-${row.id}`"
                class="cursor-pointer"
                @click="fetchDocument(row.id)"
              >
                <fa-icon
                  :icon="['fas', 'pen-to-square']"
                  class="fa-xl mx-2 text-info-content"
                />
              </label>
              <label :for="`del-${row.id}`" class="cursor-pointer">
                <fa-icon
                  :icon="['fas', 'trash-can']"
                  class="fa-xl mx-2 text-error"
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
              :title="`${$t('update')} ${$t('category')}`"
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
            class="btn"
            :class="{ 'btn-disabled': currentPage <= 1 }"
            @click="changePage('back'), currentPage--"
          >
            «
          </button>
          <button class="btn">
            {{ dataTable.totalItems }} | {{ $t("page") }} {{ currentPage }}
          </button>
          <button
            :disabled="disabledBtn"
            class="btn"
            :class="{ 'btn-disabled': currentPage >= dataTable.totalPages }"
            @click="changePage('next'), currentPage++"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import useFirebase from "@/hooks/useFirebase";
import { useStore } from "vuex";
const {
  fetchData,
  fetchDataByQuery,
  fetchDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} = useFirebase(props.moduleName);
const store = useStore();
const props = defineProps({
  cols: {
    type: Array,
    default: null,
  },
  moduleName: {
    type: String,
    default: null,
  },
});

let currentPage = ref(1);
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

const ok = async ({ action, id }) => {
  dispatchAction(`${props.moduleName}/${action}`, id);
};

const closeModal = () => {
  store.dispatch(`${props.moduleName}/resetFields`);
};
</script>

<style lang="scss" scoped></style>
