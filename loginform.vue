<template>
  <div class="login-form">
    <h2>Login</h2>
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

<style scoped>
.login-form {
  text-align: center;
  margin-top: 100px;
}
</style>


<template>
  <!-- Same template as before -->
</template>

<script>
// Same script as before
</script>

<style scoped>
/* Login Form Styles */
.login {
  display: flex;
}

.login__input {
  border: none;
  padding: 0.5rem 2rem;
  font-size: 1.6rem;
  font-family: inherit;
  text-align: center;
  width: 12rem;
  border-radius: 10rem;
  margin-right: 1rem;
  color: inherit;
  border: 1px solid #fff;
  transition: all 0.3s;
}

.login__input:focus {
  outline: none;
  border: 1px solid #ccc;
}

.login__btn {
  border: none;
  background: none;
  font-size: 2.2rem;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s;
}

.login__btn:hover,
.login__btn:focus {
  color: #777;
}
</style>
