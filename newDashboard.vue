<template>
  <div class="dashboard">
    <div class="balance">
      <h2>Welcome, {{ currentAccount.owner.split(' ')[0] }}</h2>
      <p>Balance: <span>{{ formattedBalance }}</span></p>
    </div>

    <div class="movements">
      <h3>Movements</h3>
      <div v-for="(movement, index) in currentAccount.movements" :key="index">
        <p :class="[movement > 0 ? 'deposit' : 'withdrawal']">{{ movement > 0 ? 'Deposit' : 'Withdrawal' }}: {{ formatCurrency(movement) }} on {{ formatDate(currentAccount.movementsDates[index]) }}</p>
      </div>
    </div>

    <div class="operation">
      <h3>Transfer Money</h3>
      <input v-model="transferTo" placeholder="Transfer to username" />
      <input v-model.number="transferAmount" type="number" placeholder="Amount" />
      <button @click="transferMoney">Transfer</button>
    </div>

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
    formatCurrency(value) {
      return new Intl.NumberFormat(this.currentAccount.locale, {
        style: 'currency',
        currency: this.currentAccount.currency
      }).format(value);
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
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.dashboard {
  max-width: 80rem;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #f2e8c4; /* Cream background */
  border: 2px solid #333;
  border-radius: 15px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  font-family: 'Press Start 2P', cursive;
}

.balance {
  text-align: center;
  background-color: #26c485;
  color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 0px #333;
}

h2 {
  color: #ff6f3c;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.movements {
  margin-top: 2rem;
}

.deposit {
  color: #26c485;
}

.withdrawal {
  color: #ff6f3c;
}

.operation {
  margin-top: 2rem;
  background-color: #ff66b2;
  padding: 1rem;
  border-radius: 10px;
  color: #fff;
}

button {
  background-color: #ff6f3c;
  color: #fff;
  border: none;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 5px 0px #333;
}

button:hover {
  background-color: #26c485;
}
</style>
