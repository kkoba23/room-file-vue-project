<template>
  <v-container>
    <div
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop="handleDrop"
      :class="{ 'drop-area': true, 'drop-hover': dragging }"
    >
      <p>ここにファイルをドラッグ＆ドロップ</p>
    </div>
    <v-row>
      <v-col v-for="file in files" :key="file.id" cols="12" md="4">
        <v-card>
          <v-card-title>
            {{ file.name }}
            <v-btn icon @click="removeFile(file)"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      dragging: false,
    }
  },
  methods: {
    handleDrop(event) {
      event.preventDefault()
      this.dragging = false
      const droppedFiles = event.dataTransfer.files
      for (let file of droppedFiles) {
        this.files.push({ id: Date.now(), name: file.name })
      }
    },
    removeFile(file) {
      this.files = this.files.filter((f) => f.id !== file.id)
    },
  },
}
</script>

<style>
.drop-area {
  border: 2px dashed #ccc;
  padding: 40px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  min-height: 200px;
}
.drop-hover {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}
</style>
