// 正例
<template>
  <button class="btn btn-close">X</button>
</template>
 
<style scoped>
.btn-close {
  background-color: red;
}
</style>

// 反例
<template>
  <button>X</button>
</template>
 
<style scoped>
button {
  background-color: red;
}
</style>