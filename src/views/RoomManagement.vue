<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card @click="createRoom">
          <v-card-title> <v-icon>mdi-plus</v-icon> 新しいルーム </v-card-title>
        </v-card>
      </v-col>
      <v-col v-for="room in rooms" :key="room.id" cols="12" md="4">
        <v-card @click="openRoom(room)">
          <v-card-title class="d-flex justify-space-between">
            {{ room.name }}
            <span class="room-number">{{ room.number }}</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <RoomModal
      v-if="selectedRoom"
      :room="selectedRoom"
      @update:room="updateRoomFiles"
      @close="selectedRoom = null"
    />
  </v-container>
</template>

<script>
import RoomModal from '@/components/RoomModal.vue'

export default {
  components: { RoomModal },
  data() {
    return {
      rooms: [],
      selectedRoom: null,
    }
  },
  methods: {
    createRoom() {
      const roomNumber = String(Math.floor(Math.random() * 100000)).padStart(5, '0')
      const newRoom = {
        id: Date.now(),
        number: roomNumber,
        name: `Room ${this.rooms.length + 1}`,
        files: [],
      }
      this.rooms.push(newRoom)
    },
    openRoom(room) {
      this.selectedRoom = { ...room }
    },
    updateRoomFiles(updatedRoom) {
      const index = this.rooms.findIndex((r) => r.id === updatedRoom.id)
      if (index !== -1) {
        this.rooms[index] = updatedRoom
      }
      this.selectedRoom = updatedRoom
    },
  },
}
</script>
