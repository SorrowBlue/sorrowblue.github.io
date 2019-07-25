<template>
  <v-layout wrap>
    <v-flex xs12 mt-5>
      <v-layout row justify-center class="text-xs-center">
        <v-flex xs2 sm1 class="display-4">4</v-flex>
        <v-flex xs2 sm1 class="display-4">0</v-flex>
        <v-flex xs2 sm1 class="display-4">4</v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout justify-center>
        <div class="display-1">ページが見つかりませんでした</div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => ({
    show: true
  }),
  mounted() {
    this.show = !this.show
  },
  methods: {
    setShow() {
      this.show = !this.show
    }
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
