<template>
	<div class="contact container view">
    <div class="middle-box text-center">
      <h2 class="font-exo">CONTACT</h2>
      <hr>
      <v-container fluid class="mt-5">
        <v-layout row>
          <v-flex>
            <v-layout row-md column>
              <v-flex class="mt-5">
                <v-card>
                  <v-card-media
                    src="http://lorempixel.com/300/240/cats/"
                    height="240px"
                  ></v-card-media>
                  <v-card-title>
                    <div>
                      <h3 class="headline subject">Learning Factory 운영진</h3>
                      <div class="caption text-left">
                        <v-icon>fa-phone</v-icon> 031.290.5699<br>
                        <v-icon>fa-envelope-o</v-icon> wolfwood@skku.edu<br>
                        <a href="https://sites.google.com/site/skkulf/"><v-icon class="lime--text text--darken-2">home</v-icon> sites.google.com/site/skkulf</a>
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex class="mt-5">
                <v-card>
                  <v-card-media
                    src="http://lorempixel.com/300/250/cats/"
                    height="240px"
                  ></v-card-media>
                  <v-card-title>
                    <div>
                      <h3 class="blue--text headline subject">WE-UP 사업단</h3>
                      <div class="caption text-left">
                        <v-icon>fa-phone</v-icon> 031.290.5612<br>
                        <v-icon>fa-envelope-o</v-icon> choi5698@skku.edu<br>
                        <a href="http://weup.skku.edu/intro/"><v-icon class="blue--text">home</v-icon> weup.skku.edu/intro</a>
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
	</div>
</template>

<script>
export default {
  name: 'contact'
}
</script>

<style scoped>
  .subject{
    font-family: 'nanumgothiccoding';
  }
</style>
