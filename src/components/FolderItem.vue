<template>
    <li>
      <span @click="selectFolder" class="folder-name">
        📁 {{ folder.filename }}
      </span>
    </li>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    folder: Object
  });
  
  const emits = defineEmits(['selectFolder']);
  
  const selectFolder = () => {
    emits('selectFolder', props.folder);
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
  