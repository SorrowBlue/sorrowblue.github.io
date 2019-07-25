<template>
  <v-container grid-list-md fill-height>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-layout align-end justify-center row fill-height>
          <p class="display-4 fuwafuwa4">4</p>
          <p class="display-4 fuwafuwa0">0</p>
          <p class="display-4 fuwafuwa4">4</p>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout align-start justify-center row fill-height>
          <p class="display-1">Error</p>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
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
    transform: translateY(-5vh) rotate(0deg);
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
    transform: translateY(-5vh) rotate(-10deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-5vh) rotate(10deg);
  }
}
</style>
