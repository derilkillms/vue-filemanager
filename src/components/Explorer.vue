<template>
    <div class="explorer">
      <div class="panel left">
        <button v-if="currentParentId !== 0" @click="goBack" class="back-button">⬅️ Back</button>
        <ul>
          <FolderItem 
            v-for="folder in folders" 
            :key="folder.id" 
            :folder="folder" 
            @selectFolder="loadSubFolders"
          />
        </ul>
      </div>
      <div class="panel right">
        <h3 v-if="selectedFolderName">Subfolders of {{ selectedFolderName }}</h3>
        <ul v-if="subFolders.length">
          <li v-for="folder in subFolders" :key="folder.id">
            <span @click="loadSubFolders(folder)" class="folder-name">
              📁 {{ folder.filename }}
            </span>
          </li>
        </ul>
        <p v-else>Select a folder to see its contents.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import FolderItem from './FolderItem.vue';
  
  export default {
    components: { FolderItem },
    data() {
      return {
        folders: [],
        subFolders: [],
        selectedFolderName: null,
        currentParentId: 0,
        parentMap: {} // Menyimpan mapping ID folder ke parent ID
      };
    },
    methods: {
      fetchFolders(parentId = 0, folderName = null) {
        axios.get(`http://localhost:3000/api/files`)
          .then(response => {
            this.folders = response.data.data;
            this.selectedFolderName = folderName;
            this.currentParentId = parentId;
          })
          .catch(error => console.error('Error fetching folders:', error));
      },
      loadSubFolders(folder) {
        if (folder) {
          this.selectedFolderName = folder.filename;
          this.parentMap[folder.id] = folder.parent; // Menyimpan parent ID
          axios.get(`http://localhost:3000/api/files/${folder.id}`)
            .then(response => {
              this.folders = [folder];
              this.subFolders = response.data.data;
              this.currentParentId = folder.id;
            })
            .catch(error => console.error('Error fetching subfolders:', error));
        }
      },
      goBack() {
        const parentId = this.parentMap[this.currentParentId] || 0;
        this.fetchFolders(parentId);
        this.subFolders = [];
      }
    },
    created() {
      this.fetchFolders();
    }
  };
  </script>
  
  <style>
  .explorer {
    display: flex;
    width: 50vw;
    height: 20vw;
  }
  .panel {
    width: 50%;
    border: 1px solid #ccc;
    padding: 10px;
  }
  .left {
    background: #f8f8f8;
  }
  .right {
    background: #ffffff;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .folder-name {
    cursor: pointer;
    color: #007bff;
  }
  .folder-name:hover {
    text-decoration: underline;
  }
  .back-button {
    margin-bottom: 10px;
    cursor: pointer;
    background-color: #f1f1f1;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .back-button:hover {
    background-color: #ddd;
  }
  </style>