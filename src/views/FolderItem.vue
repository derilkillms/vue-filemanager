<template>
  <li>
    <span @click="$emit('selectFolder', folder)" class="folder-name">
      📁 {{ folder.name }}
    </span>
  </li>
</template>

<script>
export default {
  name: 'FolderItem',
  props: {
    folder: Object
  }
};
</script>

<style>
.folder-name {
  cursor: pointer;
  color: #007bff;
}
.folder-name:hover {
  text-decoration: underline;
}
</style>