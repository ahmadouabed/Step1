<template>
  <div class="dashboard">
    <div class="balance">
      <h2>Welcome, {{ currentAccount.owner.split(' ')[0] }}</h2>
      <p>Balance: {{ formattedBalance }}</p>
    </div>

    <div class="movements">
      <h3>Movements</h3>
      <div v-for="(movement, index) in currentAccount.movements" :key="index">
        <p :class="[movement > 0 ? 'deposit' : 'withdrawal']">{{ movement > 0 ? 'Deposit' : 'Withdrawal' }}: {{ formatCurrency(movement) }} on {{ formatDate(currentAccount.movementsDates[index]) }}</p>
      </div>
    </div>

    <!-- Include OperationForm component for actions like transfer, loan, etc. -->
    <OperationForm :current-account="currentAccount" @update-ui="updateUI" />
    
    <button @click="$emit('logout')">Log Out</button>
  </div>
</template>

<script>
import OperationForm from './OperationForm.vue';

export default {
  props: ['currentAccount'],
  components: {
    OperationForm
  },
  computed: {
    formattedBalance() {
      return this.currentAccount.movements.reduce((acc, mov) => acc + mov, 0);
    }
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat(this.currentAccount.locale, {
        style: 'currency',
        currency: this.currentAccount.currency
      }).format(value);
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    updateUI() {
      this.$emit('update-ui');
    }
  }
};
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background-color: #ff5f5f;
  color: white;
  border-radius: 15px;
  margin-top: 2rem;
}

.balance {
  text-align: center;
  font-size: 2rem;
}

.movements {
  margin-top: 1rem;
}

.deposit {
  color: #26c485;
}

.withdrawal {
  color: #ff6f3c;
}
</style>
