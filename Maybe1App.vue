<template>
  <div id="app">
    <!-- TOP NAVIGATION -->
    <nav class="mdl-navigation">
      <p class="welcome">{{ welcomeMessage }}</p>
      <img src="logo.png" alt="Logo" class="mdl-logo" />
      <form class="login mdl-shadow--2dp" @submit.prevent="handleLogin">
        <input
          type="text"
          placeholder="user"
          v-model="loginUser"
          class="mdl-textfield__input login__input login__input--user"
        />
        <input
          type="password"
          placeholder="PIN"
          maxlength="4"
          v-model="loginPin"
          class="mdl-textfield__input login__input login__input--pin"
        />
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored login__btn">&rarr;</button>
      </form>
    </nav>

    <main class="mdl-grid app" v-if="currentAccount">
      <!-- BALANCE -->
      <div class="balance mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
        <div class="balance__info">
          <p class="balance__label">Current balance</p>
          <p class="balance__date">As of {{ formattedDate }}</p>
        </div>
        <p class="balance__value">{{ formattedBalance }}</p>
      </div>

      <!-- MOVEMENTS -->
      <div class="movements mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
        <div
          v-for="(mov, index) in sortedMovements"
          :key="index"
          class="movements__row mdl-list__item"
        >
          <div :class="['movements__type', movementType(mov)]">
            {{ index + 1 }} {{ movementType(mov).split('--')[1] }}
          </div>
          <div class="movements__date">{{ formatMovementDate(account.movementsDates[index]) }}</div>
          <div class="movements__value">{{ formatCurrency(mov) }}</div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="summary mdl-cell mdl-cell--12-col mdl-grid">
        <div class="mdl-cell mdl-cell--4-col summary__item mdl-shadow--2dp">
          <p class="summary__label">In</p>
          <p class="summary__value summary__value--in">{{ formattedIncome }}</p>
        </div>
        <div class="mdl-cell mdl-cell--4-col summary__item mdl-shadow--2dp">
          <p class="summary__label">Out</p>
          <p class="summary__value summary__value--out">{{ formattedOut }}</p>
        </div>
        <div class="mdl-cell mdl-cell--4-col summary__item mdl-shadow--2dp">
          <p class="summary__label">Interest</p>
          <p class="summary__value summary__value--interest">{{ formattedInterest }}</p>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised btn--sort mdl-cell mdl-cell--12-col">
          &downarrow; SORT
        </button>
      </div>

      <!-- OPERATION: TRANSFER -->
      <div class="operation operation--transfer mdl-cell mdl-cell--6-col mdl-shadow--2dp">
        <h2>Transfer money</h2>
        <form class="form form--transfer" @submit.prevent="transferMoney">
          <input type="text" v-model="transferTo" class="mdl-textfield__input form__input form__input--to" />
          <input type="number" v-model.number="transferAmount" class="mdl-textfield__input form__input form__input--amount" />
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div>

      <!-- OPERATION: LOAN -->
      <div class="operation operation--loan mdl-cell mdl-cell--6-col mdl-shadow--2dp">
        <h2>Request loan</h2>
        <form class="form form--loan" @submit.prevent="requestLoan">
          <input type="number" v-model.number="loanAmount" class="mdl-textfield__input form__input form__input--loan-amount" />
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored form__btn form__btn--loan">&rarr;</button>
          <label class="form__label form__label--loan">Amount</label>
        </form>
      </div>

      <!-- OPERATION: CLOSE ACCOUNT -->
      <div class="operation operation--close mdl-cell mdl-cell--12-col mdl-shadow--2dp">
        <h2>Close account</h2>
        <form class="form form--close" @submit.prevent="closeAccount">
          <input type="text" v-model="closeUser" class="mdl-textfield__input form__input form__input--user" />
          <input
            type="password"
            v-model="closePin"
            maxlength="4"
            class="mdl-textfield__input form__input form__input--pin"
          />
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored form__btn form__btn--close">&rarr;</button>
          <label class="form__label">Confirm user</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div>

      <!-- LOGOUT TIMER -->
      <p class="logout-timer mdl-typography--caption">
        You will be logged out in <span class="timer">{{ formattedTimer }}</span>
      </p>
    </main>
  </div>
</template>


<script>
export default {
  name: 'Bankerist',
  data() {
    return {
      loginUser: '',
      loginPin: '',
      currentAccount: null,
      isSorted: false,
      timer: null,
      timeRemaining: 300,
      transferTo: '',
      transferAmount: 0,
      loanAmount: 0,
      closeUser: '',
      closePin: '',
      accounts: [
        {
          owner: 'Jonas Schmedtmann',
          movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
          interestRate: 1.2,
          pin: 1111,
          movementsDates: [
            '2019-11-18T21:31:17.178Z',
            '2019-12-23T07:42:02.383Z',
            '2020-01-28T09:15:04.904Z',
            '2020-04-01T10:17:24.185Z',
            '2020-05-08T14:11:59.604Z',
            '2022-12-01T17:01:17.194Z',
            '2022-12-06T23:36:17.929Z',
            '2022-12-08T10:51:36.790Z'
          ],
          currency: 'EUR',
          locale: 'pt-PT'
        },
        {
          owner: 'Alamin Mt',
          movements: [2500, 400, -260, 830, -4210, 2200, 4600, -70],
          interestRate: 1.8,
          pin: 2222,
          movementsDates: [
            '2019-11-03T13:15:33.035Z',
            '2019-11-25T09:48:16.867Z',
            '2019-12-16T06:04:23.907Z',
            '2020-01-12T14:18:46.235Z',
            '2020-02-25T16:33:06.386Z',
            '2020-04-11T14:43:26.374Z',
            '2020-06-15T18:49:59.371Z',
            '2020-07-30T12:01:20.894Z'
          ],
          currency: 'BDT',
          locale: 'en-US'
        }
      ]
    };
  },
  computed: {
    welcomeMessage() {
      return this.currentAccount
        ? `Welcome back, ${this.currentAccount.owner.split(' ')[0]}!`
        : 'Log in to get started';
    },
    account() {
      return this.currentAccount;
    },
    formattedBalance() {
      if (!this.account) return '0€';
      const balance = this.account.movements.reduce((acc, mov) => acc + mov, 0);
      return this.formatCurrency(balance);
    },
    sortedMovements() {
      const movs = this.account.movements.slice();
      return this.isSorted ? movs.sort((a, b) => a - b) : movs;
    },
    formattedIncome() {
      const incomes = this.account.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
      return this.formatCurrency(incomes);
    },
    formattedOut() {
      const out = this.account.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
      return this.formatCurrency(Math.abs(out));
    },
    formattedInterest() {
      const interest = this.account.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * this.account.interestRate) / 100)
        .reduce((acc, int) => acc + int, 0);
      return this.formatCurrency(interest);
    },
    formattedDate() {
      const now = new Date();
      return new Intl.DateTimeFormat(this.account.locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);
    },
    formattedTimer() {
      const min = String(Math.floor(this.timeRemaining / 60)).padStart(2, '0');
      const sec = String(this.timeRemaining % 60).padStart(2, '0');
      return `${min}:${sec}`;
    },
    
  currentBalance() {
    return this.currentAccount.movements.reduce((acc, mov) => acc + mov, 0);
  }


  },
  methods: {
    movementType(movement) {
    return movement > 0 ? 'movements__type--deposit' : 'movements__type--withdrawal';
  },

     handleLogin() {
    const account = this.accounts.find(
      (acc) =>
        acc.owner.toLowerCase().split(" ").map((name) => name[0]).join("") ===
        this.loginUser
    );
    if (account?.pin === +this.loginPin) {
      this.currentAccount = account;
      
      // Clear previous login data
      this.loginUser = '';
      this.loginPin = '';
      
      // Restart the logout timer
      this.startLogOutTimer();
    } else {
      alert("Invalid login credentials");
    }
  },
    formatMovementDate(dateString) {
      const date = new Date(dateString);
      const daysPassed = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
      if (daysPassed === 0) return 'Today';
      if (daysPassed === 1) return 'Yesterday';
      return daysPassed <= 7 ? `${daysPassed} days ago` : new Intl.DateTimeFormat(this.account.locale).format(date);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat(this.account.locale, {
        style: 'currency',
        currency: this.account.currency
      }).format(value);
    },
    sortMovements() {
      this.isSorted = !this.isSorted;
    },
    startLogOutTimer() {
    // Clear any existing timer
    if (this.timer) clearInterval(this.timer);

    this.timeRemaining = 300;
    this.timer = setInterval(() => {
      this.timeRemaining--;
      
      // Auto logout when timer reaches zero
      if (this.timeRemaining === 0) {
        clearInterval(this.timer);
        this.currentAccount = null;
        
        // Reset login fields on logout
        this.loginUser = '';
        this.loginPin = '';
        alert("You have been logged out due to inactivity.");
      }
    }, 1000);
  },
    transferMoney() {
  const receiverAcc = this.accounts.find(
    (acc) => acc.owner.toLowerCase().split(' ').map(name => name[0]).join('') === this.transferTo
  );
  
  // Ensure both the recipient exists and the user has enough balance
  if (
    receiverAcc &&
    this.transferAmount > 0 &&
    this.currentBalance >= this.transferAmount && // using computed balance here
    receiverAcc !== this.currentAccount // prevent transferring to self
  ) {
    this.currentAccount.movements.push(-this.transferAmount);
    receiverAcc.movements.push(this.transferAmount);
    this.currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    this.transferAmount = 0;
    this.transferTo = '';
    this.updateUI();
    alert('Transfer successful');
  } else {
    alert('Invalid transfer details');
  }
}
,
    requestLoan() {
      if (
        this.loanAmount > 0 &&
        this.currentAccount.movements.some((mov) => mov >= (this.loanAmount * 10) / 100)
      ) {
        setTimeout(() => {
          this.currentAccount.movements.push(this.loanAmount);
          this.currentAccount.movementsDates.push(new Date().toISOString());
          this.loanAmount = 0;
          this.updateUI();
          alert('Loan approved');
        }, 2000);
      } else {
        alert('Loan request denied');
      }
    },
    closeAccount() {
  const enteredUsername = this.closeUser.trim().toLowerCase();
  const currentUsername = this.currentAccount?.owner.split(" ")[0].toLowerCase();
  const enteredPin = Number(this.closePin);
  const currentPin = this.currentAccount?.pin;

  if (enteredUsername === currentUsername && enteredPin === currentPin) {
    const index = this.accounts.findIndex(
      (acc) => acc.owner === this.currentAccount.owner
    );
    this.accounts.splice(index, 1);

    // Reset login and account data
    this.currentAccount = null;
    this.loginUser = '';
    this.loginPin = '';
    this.closeUser = '';
    this.closePin = '';

    // Clear the timer
    clearInterval(this.timer);

    alert("Account closed");
  } else {
    alert("Incorrect details");
  }
}
,
    updateUI() {
      this.$forceUpdate(); // Forces the UI to re-render after updates
    }
  }
};
</script>

<style scoped>
/* Root styles */
body {
  font-family: "Roboto", sans-serif;
  background-color: #f3f4f6;
  margin: 0;
  padding: 0;
}

/* Navigation */
.mdl-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #6200ea;
  color: #fff;
}

.welcome {
  font-size: 1.6rem;
  font-weight: 400;
}

.mdl-logo {
  height: 5rem;
}

.login {
  display: flex;
  align-items: center;
}

.login__input {
  border: none;
  background: #fff;
  padding: 0.8rem 1.6rem;
  margin-right: 1rem;
  border-radius: 0.4rem;
  color: #000;
  width: 12rem;
  font-size: 1.4rem;
}

.login__btn {
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
}

.mdl-button {
  background-color: #6200ea;
  color: #fff;
}

/* App layout */
.app {
  margin: 2rem auto;
  max-width: 1200px;
}

.mdl-card {
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance__label {
  font-size: 1.8rem;
  font-weight: 500;
}

.balance__value {
  font-size: 3.4rem;
  font-weight: 400;
  color: #03dac5;
}

/* Movements */
.movements__row {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.movements__type {
  font-size: 1.4rem;
  font-weight: 500;
}

.movements__date {
  color: #757575;
}

/* Summary */
.summary {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}

.summary__item {
  text-align: center;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.8rem;
}

.summary__label {
  font-size: 1.2rem;
  font-weight: 400;
  color: #6200ea;
}

.summary__value {
  font-size: 2.2rem;
}

/* Operations */
.operation {
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.8rem;
}

.operation--transfer,
.operation--loan,
.operation--close {
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.6rem;
  font-weight: 500;
}

.form__input {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
}

.form__btn {
  width: 100%;
  padding: 1rem;
  cursor: pointer;
}

.logout-timer {
  text-align: center;
}



</style>
