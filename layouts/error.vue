<template>
  <v-layout column wrap text-center justify-center>
    <v-flex xs1 mt-5>
      <v-layout row justify-center class="text-xs-center">
        <v-flex xs2 sm1 class="display-4 fuwafuwa4">4</v-flex>
        <v-flex xs2 sm1 class="display-4 fuwafuwa0">0</v-flex>
        <v-flex xs2 sm1 class="display-4 fuwafuwa4">4</v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs1>
      <v-layout justify-center>
        <p class="display-1">Not found page.</p>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({ onon: 'dawdw' }),
  asyncData({ params }) {
    return { title: params }
  }
}
</script>

<style>
.fuwafuwa4 {
  animation: fuwafuwa4 3s infinite linear alternate;
}
@keyframes fuwafuwa4 {
  0% {
    transform: translateY(0) rotate(-10deg);
  }
  50% {
    transform: translateY(-20px) rotate(0deg);
  }
  100% {
    transform: translateY(0) rotate(10deg);
  }
}

.fuwafuwa0 {
  animation: fuwafuwa0 3s infinite linear alternate;
}
@keyframes fuwafuwa0 {
  0% {
    transform: translateY(-20px) rotate(-10deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-20px) rotate(10deg);
  }
}
</style>
