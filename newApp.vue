<template>
  <div id="app">
    <nav class="navbar">
      <p class="welcome" v-if="!isAuthenticated">Log in to get started</p>
      <p class="welcome" v-if="isAuthenticated">Welcome, {{ currentAccount?.owner.split(' ')[0] }}!</p>
      <img src="logo.png" alt="Logo" class="logo" />
    </nav>

    <LoginForm v-if="!isAuthenticated" @login="handleLogin" />
    <Dashboard v-if="isAuthenticated" :current-account="currentAccount" @logout="handleLogout" />
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
        // Account data here (as described before)
      ],
      currentAccount: null,
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
      } else {
        alert('Invalid username or PIN.');
      }
    },
    handleLogout() {
      this.isAuthenticated = false;
      this.currentAccount = null;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Global Styles */
body {
  font-family: 'Press Start 2P', cursive;
  background-color: #f2e8c4; /* Cream background */
  color: #2b1c1b; /* Dark brown text */
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

#app {
  text-align: center;
  max-width: 100vw;
  overflow: hidden;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background-color: #ff6f3c; /* Vibrant orange */
  color: #fff;
  border-bottom: 4px solid #333; /* Dark border for retro effect */
}

.welcome {
  font-size: 1.6rem;
  color: #fff;
}

.logo {
  height: 50px;
}

/* Retro Neon Animation for Logo (Optional) */
@keyframes neonGlow {
  0% {
    text-shadow: 0 0 5px #ff66b2, 0 0 10px #ff66b2, 0 0 15px #ff66b2, 0 0 20px #ff66b2;
  }
  100% {
    text-shadow: 0 0 10px #ff66b2, 0 0 20px #ff66b2, 0 0 30px #ff66b2, 0 0 40px #ff66b2;
  }
}

.logo {
  animation: neonGlow 1.5s ease-in-out infinite alternate;
}

/* Style for Main App Container */
#app {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
