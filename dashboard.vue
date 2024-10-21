
<template>
  <div class="dashboard">
    <!-- Balance and Movements -->
    <div class="balance">
      <h2>Welcome back, {{ currentAccount.owner.split(' ')[0] }}</h2>
      <p>Current Balance: {{ formattedBalance }}</p>
    </div>

    <div class="movements">
      <h3>Movements</h3>
      <div v-for="(movement, index) in currentAccount.movements" :key="index">
        <p>{{ movement > 0 ? 'Deposit' : 'Withdrawal' }}: {{ movement }} on {{ formatDate(currentAccount.movementsDates[index]) }}</p>
      </div>
    </div>

    <!-- Transfer Money -->
    <div class="operation">
      <h3>Transfer Money</h3>
      <input v-model="transferTo" placeholder="Transfer to username" />
      <input v-model.number="transferAmount" placeholder="Amount" type="number" />
      <button @click="transferMoney">Transfer</button>
    </div>

    <!-- Logout Button -->
    <button @click="$emit('logout')">Log Out</button>
  </div>
</template>

<script>
export default {
  props: ['currentAccount'],
  data() {
    return {
      transferTo: '',
      transferAmount: 0,
    };
  },
  computed: {
    formattedBalance() {
      return this.currentAccount.movements.reduce((acc, mov) => acc + mov, 0);
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    transferMoney() {
      if (this.transferTo && this.transferAmount > 0) {
        alert(`Transferred ${this.transferAmount} to ${this.transferTo}`);
      } else {
        alert('Invalid transfer details.');
      }
    }
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>

<template>
  <!-- Same template as before -->
</template>

<script>
// Same script as before
</script>

<style scoped>
/* Dashboard Styles */
.dashboard {
  max-width: 100rem;
  margin: 4rem auto;
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-template-rows: auto repeat(3, 15rem) auto;
  gap: 2rem;
  opacity: 0;
  transition: all 1s;
}

.balance {
  grid-column: 1 / span 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.movements {
  grid-row: 2 / span 3;
  background-color: #fff;
  border-radius: 1rem;
  overflow: scroll;
}

.movements__row {
  padding: 2.25rem 4rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.movements__type {
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 500;
  color: #fff;
  padding: 0.1rem 1rem;
  border-radius: 10rem;
  margin-right: 2rem;
}

.movements__type--deposit {
  background-image: linear-gradient(to top left, #39b385, #9be15d);
}

.movements__type--withdrawal {
  background-image: linear-gradient(to top left, #e52a5a, #ff585f);
}

.movements__value {
  font-size: 1.7rem;
  margin-left: auto;
}

/* Other relevant styles from style.css */
</style>

