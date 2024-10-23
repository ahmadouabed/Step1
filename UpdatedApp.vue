<template>
  <div id="app">
    <nav class="navbar">
      <p class="welcome" v-if="!isAuthenticated">Log in to get started</p>
      <p class="welcome" v-if="isAuthenticated">Welcome, {{ currentAccount?.owner.split(' ')[0] }}!</p>
      <img src="logo.png" alt="Bankist Logo" class="logo" />
    </nav>

    <LoginForm v-if="!isAuthenticated" @login="handleLogin" />
    <Dashboard v-if="isAuthenticated" :current-account="currentAccount" @update-ui="updateUI" @logout="handleLogout" />
    <p class="logout-timer" v-if="isAuthenticated">You will be logged out in <span class="timer">{{ timerLabel }}</span></p>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import Dashboard from './components/Dashboard.vue';

export default {
  data() {
    return {
      isAuthenticated: false,
      accounts: [
        // Add the account data here (from the uploaded script.js)
      ],
      currentAccount: null,
      timer: null,
      timerLabel: '05:00' // Initial timer display
    };
  },
  components: {
    LoginForm,
    Dashboard,
  },
  methods: {
    handleLogin({ username, pin }) {
      const account = this.accounts.find(acc => acc.username === username && acc.pin === Number(pin));
      if (account) {
        this.currentAccount = account;
        this.isAuthenticated = true;
        this.startLogoutTimer(); // Start the timer after login
      } else {
        alert('Invalid credentials.');
      }
    },
    handleLogout() {
      this.isAuthenticated = false;
      this.currentAccount = null;
      clearInterval(this.timer); // Clear the timer on logout
    },
    updateUI() {
      this.startLogoutTimer(); // Reset the timer after any operation (like transfer, loan, etc.)
    },
    startLogoutTimer() {
      let time = 300; // 5 minutes in seconds

      const tick = () => {
        const min = String(Math.trunc(time / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');
        this.timerLabel = `${min}:${sec}`;

        if (time === 0) {
          clearInterval(this.timer);
          this.isAuthenticated = false;
          this.currentAccount = null;
          alert('Session expired! You have been logged out.');
        }
        time--;
      };

      clearInterval(this.timer); // Clear any previous timer
      this.timer = setInterval(tick, 1000); // Start the new timer
    }
  }
};
</script>

<style scoped>
/* ...same styles as before... */

.logout-timer {
  padding: 0.5rem;
  color: #ff5f5f;
  font-size: 1.2rem;
  text-align: right;
}
</style>
