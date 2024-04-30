<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
    style="margin-top: 100px"
  >
    <template #extra>
      <a-button type="primary" @click="() => $router.go(-1)">Back</a-button>
    </template>
  </a-result>
</template>
