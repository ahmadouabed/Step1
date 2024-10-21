<template>
  <div class="login-form">
    <h2>Retro Bankist</h2>
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
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.login-form {
  text-align: center;
  margin-top: 100px;
  background-color: #f2e8c4; /* Cream background */
  padding: 2rem;
  border: 2px solid #333; /* Dark retro border */
  border-radius: 15px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3); /* Bold shadow */
  font-family: 'Press Start 2P', cursive; /* Retro font */
}

h2 {
  color: #ff6f3c; /* Vibrant orange */
  font-size: 2rem;
}

input {
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  border: 2px solid #333; /* Black border for retro style */
  font-family: inherit;
  font-size: 1.2rem;
  background-color: #f2e8c4;
  color: #2b1c1b; /* Dark brown for text */
  box-shadow: 0 5px 0px #333; /* Button-like shadow */
}

input:focus {
  outline: none;
  background-color: #ff66b2; /* Bright Pink focus */
  color: #fff; /* Contrast text */
}

button {
  background-color: #26c485; /* Teal */
  color: #fff;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.5rem;
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 0px #333; /* Button shadow */
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff6f3c; /* Change to vibrant orange on hover */
}
</style>
