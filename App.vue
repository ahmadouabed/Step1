<template>
  <div id="app">
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
        {
          owner: "Sadeesha Jayaweera",
          username: "sj",
          movements: [200, 455.23, -306.5, 25000],
          interestRate: 1.2,
          pin: 1111,
          currency: "EUR",
          locale: "pt-PT",
          movementsDates: [
            "2019-11-18T21:31:17.178Z",
            "2019-12-23T07:42:02.383Z",
            "2020-01-28T09:15:04.904Z",
            "2020-04-01T10:17:24.185Z"
          ]
        },
        {
          owner: "Jessica Davis",
          username: "jd",
          movements: [5000, 3400, -150, -790],
          interestRate: 1.5,
          pin: 2222,
          currency: "USD",
          locale: "en-US",
          movementsDates: [
            "2019-11-01T13:15:33.035Z",
            "2019-11-30T09:48:16.867Z",
            "2019-12-25T06:04:23.907Z",
            "2020-01-25T14:18:46.235Z"
          ]
        }
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
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  color: #444;
  background-color: #f3f3f3;
  height: 100vh;
  padding: 2rem;
}
</style>

