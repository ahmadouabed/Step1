<template>
  <div class="login-form">
    <h2>Log In</h2>
    <form @submit.prevent="submitLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="pin" type="password" placeholder="PIN" maxlength="4" required />
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      pin: ''
    };
  },
  methods: {
    submitLogin() {
      this.$emit('login', { username: this.username, pin: this.pin });
    }
  }
};
</script>
