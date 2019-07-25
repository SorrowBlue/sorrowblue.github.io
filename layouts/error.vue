<template>
  <v-layout row align-center justify-center>
    <v-flex xs12 mt-5>
      <v-layout row justify-center>
        <p class="display-4 fuwafuwa4">4</p>
        <p class="display-4 fuwafuwa0">0</p>
        <p class="display-4 fuwafuwa4">4</p>
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
