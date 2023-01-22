import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { db } from "@/plugins/firebase.js";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getCountFromServer,
  serverTimestamp,
  query,
  orderBy,
  startAfter,
  endBefore,
  limit,
  limitToLast,
  where,
  onSnapshot,
} from "firebase/firestore";

export default (collectionName) => {
  const store = useStore();
  const toast = useToast();
  const { t } = useI18n();
  const col = collection(db, collectionName);
  const visible = reactive({
    firstDoc: null,
    lastDoc: null,
  });

  const dataTable = computed(() => {
    return store.getters[`${collectionName}/table`];
  });

  const fetchCount = async () => {
    const snapShot = await getCountFromServer(col);
    const total = await snapShot.data().count;
    const totalPages = await Math.ceil(total / 10);
    await store.commit(`${collectionName}/setTableValue`, {
      key: "totalItems",
      value: total,
    });
    await store.commit(`${collectionName}/setTableValue`, {
      key: "totalPages",
      value: totalPages,
    });
  };

  const dispatchData = async (q) => {
    await onSnapshot(q, async ({ docs }) => {
      await fetchCount();
      visible.firstDoc = docs[0];
      visible.lastDoc = await docs[docs.length - 1];
      const data = await docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      await store.dispatch(`${collectionName}/fetchData`, data);
    });
  };

  const fetchData = async (rows = 10) => {
    const q = await query(col, orderBy("timestamp"), limit(rows));
    dispatchData(q);
  };

  const fetchDataByQuery = async (dir, text, rows = 10) => {
    let q = await null;
    if (dir === "next") {
      if (!visible.lastDoc) return;
      q = await query(
        col,
        orderBy("timestamp"),
        limit(rows),
        startAfter(visible.lastDoc)
      );
    } else if (dir === "back") {
      if (!visible.firstDoc) return;
      q = await query(
        col,
        orderBy("timestamp"),
        limitToLast(rows),
        endBefore(visible.firstDoc)
      );
    } else if (dir === "search") {
      if (!text) return;
      q = await query(
        col,
        orderBy("timestamp"),
        limit(rows),
        where("name", "==", text)
      );
    } else if (dir === "resetSearch") {
      if (text) return;
      q = await query(col, orderBy("timestamp"), limit(rows));
    }

    await dispatchData(q);
  };

  const fetchDocument = async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    store.dispatch(`${collectionName}/showSingleData`, docSnap.data());
  };

  const addDocument = async () => {
    const fields = await store.getters[`${collectionName}/fields`];
    await addDoc(collection(db, collectionName), {
      ...fields,
      timestamp: serverTimestamp(),
    });
    toast.success(t("added"));
    fetchCount();
    await store.dispatch(`${collectionName}/resetFields`);
  };

  const updateDocument = async (id) => {
    const fields = await store.getters[`${collectionName}/fields`];
    await updateDoc(doc(db, collectionName, id), fields);
    toast.success(t("updates"));
    await store.dispatch(`${collectionName}/resetFields`);
  };

  const deleteDocument = async (id) => {
    let first = dataTable.value.totalItems.toString().match(/\d$/);
    await deleteDoc(doc(db, collectionName, id));
    fetchCount();
    if (first == 1) {
      fetchDataByQuery("back");
    }
  };

  return {
    fetchData,
    fetchDataByQuery,
    fetchDocument,
    addDocument,
    updateDocument,
    deleteDocument,
  };
};
