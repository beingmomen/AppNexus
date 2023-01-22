<template>
  <Table :title="$t('app')" :cols="tableHeader" :module-name="moduleName">
    <template #form>
      <form class="grid grid-cols-6 gap-4">
        <Input
          class="col-start-1 col-end-4"
          :label="$t('name')"
          store-key="name"
          :module-name="moduleName"
        />
        <Input
          class="col-end-7 col-span-3"
          :label="$t('package_name')"
          store-key="packageName"
          :module-name="moduleName"
        />
        <Input
          class="col-start-1 col-end-4"
          :label="$t('version_name')"
          store-key="versionName"
          :module-name="moduleName"
        />
        <Input
          class="col-end-7 col-span-3"
          :label="$t('version_code')"
          store-key="versionCode"
          :module-name="moduleName"
        />
        <File
          class="col-start-1 col-end-4"
          :label="$t('logo')"
          store-key="logo"
          :module-name="moduleName"
          storage-path="apps/images"
        />
        <File
          class="col-end-7 col-span-3"
          :label="$t('apk')"
          store-key="apk"
          :module-name="moduleName"
          :image="false"
          accept="application/vnd.android.package-archive"
          storage-path="apps/apk/"
        />
        <Select
          class="col-start-1 col-end-7"
          :label="$t('categories')"
          store-key="category"
          :module-name="moduleName"
        />
        <Files
          class="col-start-1 col-end-7"
          :label="$t('images')"
          store-key="images"
          :multiple="true"
          :module-name="moduleName"
        />
      </form>
    </template>
  </Table>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const moduleName = "apps";
const tableHeader = computed(() => {
  const header = [
    {
      key: "name",
      name: t("name"),
    },
  ];
  return header;
});
</script>

<style lang="scss" scoped></style>
