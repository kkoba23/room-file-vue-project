// src/components/RoomModal.vue
<template>
  <v-dialog :model-value="Boolean(room)" @click:outside="$emit('close')">
    <v-card v-if="room">
      <v-card-title class="d-flex justify-space-between">
        <span v-if="!isEditing" @click="isEditing = true" class="editable-title">{{
          editableRoom.name
        }}</span>
        <v-text-field
          v-else
          v-model="editableRoom.name"
          label="ルーム名"
          dense
          solo
          @blur="saveAndExit"
        ></v-text-field>
        <span class="room-number">{{ room.number }}</span>
      </v-card-title>
      <v-card-text>
        <div
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop="handleDrop"
          :class="{ 'drop-area': true, 'drop-hover': dragging }"
        >
          <p>ここにファイルをドラッグ＆ドロップ</p>
        </div>
        <v-row>
          <v-col v-for="file in room.files" :key="file.id" cols="12" md="4">
            <v-card>
              <v-card-actions class="d-flex justify-end">
                <v-checkbox v-model="file.selected" class="mr-2"></v-checkbox>
              </v-card-actions>
              <v-img v-if="file.thumbnail" :src="file.thumbnail" height="100px" contain></v-img>
              <v-card-title>
                {{ file.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    room: Object,
  },
  emits: ['close', 'update:room'],
  data() {
    return {
      dragging: false,
      isEditing: false,
      editableRoom: { ...this.room },
    }
  },
  watch: {
    room: {
      handler(newVal) {
        this.editableRoom = { ...newVal }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleDrop(event) {
      event.preventDefault()
      this.dragging = false
      const droppedFiles = event.dataTransfer.files
      const filesArray = Array.from(droppedFiles).map((file) => ({
        id: Date.now(),
        name: file.name,
        thumbnail: URL.createObjectURL(file),
        selected: false,
      }))
      this.editableRoom.files = [...this.editableRoom.files, ...filesArray]
      const updatedRoom = { ...this.room, files: [...this.room.files, ...filesArray] }
      this.$emit('update:room', updatedRoom)
    },
    saveChanges() {
      this.$emit('update:room', this.editableRoom)
    },
    saveAndExit() {
      this.saveChanges()
      this.isEditing = false
    },
  },
}
</script>

<style>
.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.drop-hover {
  border-color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}
.room-number {
  font-weight: bold;
}
.editable-title {
  cursor: pointer;
  font-weight: bold;
}
</style>
