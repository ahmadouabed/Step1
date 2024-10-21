
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
