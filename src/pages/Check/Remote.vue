<template>
  <div class="contaier remote view text-center">
    <v-container class="SFwide">
      <h2 class="text-center font-exo">SMART KEY</h2>
        <v-container class="SF-middle-box">
        <v-layout row-md column justify-space-around class="pt-2">
          <v-flex md3 sm12 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat class="SFtall">
                <v-icon class="SFbtn-lg cyan--text text--darken-1">lock_open</v-icon>
              </v-btn>
              <div class="text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">문열림</h5>
              </div>
            </v-card>
          </v-flex>
          <v-flex md3 sm12 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat class="SFtall">
                <v-icon class="SFbtn-lg cyan--text text--darken-1">directions_run</v-icon>
              </v-btn>
              <div class="text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">조기반납</h5>
              </div>
            </v-card>
          </v-flex>
          <v-flex md3 sm12 class="my-2">
            <v-card class="elevation-10">
              <v-btn flat class="SFtall">
                <v-icon class="SFbtn-lg cyan--text text--darken-1">build</v-icon>
              </v-btn>
              <div class="text-center pa-3">
                <h5 class="btn-caption font-noto grey--text text--darken-1">고장신고</h5>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
