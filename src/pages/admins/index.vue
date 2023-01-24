<template>
  <Table
    :title="$t('admin')"
    :cols="tableHeader"
    :action="false"
    :module-name="moduleName"
  >
    <template #form>
      <form>
        <Input :label="$t('name')" store-key="name" :module-name="moduleName" />
      </form>
    </template>
  </Table>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const moduleName = "admins";
const tableHeader = computed(() => {
  const header = [
    {
      key: "name",
      name: t("name"),
    },
    {
      key: "email",
      name: t("email"),
    },
    {
      key: "image",
      name: t("image"),
    },
  ];
  return header;
});
</script>

<style lang="scss" scoped></style>
