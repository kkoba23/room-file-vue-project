// src/App.vue
<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <v-toolbar-title>Poranosルーム＆ファイル管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item to="/rooms">ルーム管理</v-list-item>
        <v-list-item to="/files">ファイル管理</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.room-number {
  margin-left: auto;
  font-weight: bold;
}
</style>
