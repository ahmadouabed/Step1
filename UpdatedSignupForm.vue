<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <form @submit.prevent="submitSignup">
      <input v-model="owner" type="text" placeholder="Full Name" required />
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="pin" type="password" placeholder="PIN" maxlength="4" required />
      <input v-model.number="initialBalance" type="number" placeholder="Initial Balance" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      owner: '',
      username: '',
      pin: '',
      initialBalance: 0
    };
  },
  methods: {
    submitSignup() {
      if (this.username && this.pin && this.initialBalance > 0) {
        const newAccount = {
          owner: this.owner,
          username: this.username,
          pin: Number(this.pin),
          movements: [this.initialBalance],
          movementsDates: [new Date().toISOString()],
          interestRate: 1.5, // Set a default interest rate
          currency: 'USD', // Default currency
          locale: navigator.language, // Locale for dates
        };
        this.$emit('signup', newAccount);
      } else {
        alert('Please fill in all fields correctly.');
      }
    }
  }
};
</script>

<style scoped>
.signup-form {
  text-align: center;
  margin-top: 100px;
  background-color: #fdf3e7;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #ff5f5f;
}

input {
  width: 80%;
  padding: 1rem;
  margin: 1rem 0;
  border: 2px solid #ff5f5f;
  border-radius: 10px;
}

button {
  background-color: #ff5f5f;
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ff7f7f;
}
</style>
