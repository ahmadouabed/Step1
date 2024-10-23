<template>
  <div class="operation-form">
    <h3>Operations</h3>
    <div class="operation">
      <h4>Transfer Money</h4>
      <input v-model="transferTo" placeholder="Transfer to" />
      <input v-model.number="transferAmount" type="number" placeholder="Amount" />
      <button @click="transferMoney">Transfer</button>
    </div>

    <div class="operation">
      <h4>Request Loan</h4>
      <input v-model.number="loanAmount" type="number" placeholder="Loan amount" />
      <button @click="requestLoan">Request</button>
    </div>

    <div class="operation">
      <h4>Close Account</h4>
      <input v-model="closeUsername" placeholder="Confirm Username" />
      <input v-model="closePin" type="password" placeholder="Confirm PIN" />
      <button @click="closeAccount">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentAccount', 'accounts'],
  data() {
    return {
      transferTo: '',
      transferAmount: 0,
      loanAmount: 0,
      closeUsername: '',
      closePin: ''
    };
  },
  methods: {
    transferMoney() {
      if (!this.transferTo || this.transferAmount <= 0) {
        alert('Please enter a valid recipient and amount.');
        return;
      }

      const receiverAcc = this.accounts.find(acc => acc.username === this.transferTo);
      if (
        receiverAcc &&
        this.currentAccount.balance >= this.transferAmount &&
        receiverAcc.username !== this.currentAccount.username
      ) {
        // Perform the transfer
        this.currentAccount.movements.push(-this.transferAmount);
        receiverAcc.movements.push(this.transferAmount);

        // Add transfer dates
        this.currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // Reset timer
        this.$emit('update-ui');

        // Reset fields
        this.transferTo = '';
        this.transferAmount = 0;
      } else {
        alert('Invalid transfer details or insufficient funds.');
      }
    },
    requestLoan() {
      if (this.loanAmount <= 0) {
        alert('Please enter a valid loan amount.');
        return;
      }

      const anyDepositQualifies = this.currentAccount.movements.some(
        mov => mov >= this.loanAmount * 0.1
      );

      if (anyDepositQualifies) {
        setTimeout(() => {
          this.currentAccount.movements.push(this.loanAmount);
          this.currentAccount.movementsDates.push(new Date().toISOString());

          // Reset timer and update UI
          this.$emit('update-ui');
          alert(`Loan of ${this.loanAmount} granted`);

          // Reset fields
          this.loanAmount = 0;
        }, 1000);
      } else {
        alert('Loan request denied.');
      }
    },
    closeAccount() {
      if (
        this.closeUsername !== this.currentAccount.username ||
        Number(this.closePin) !== this.currentAccount.pin
      ) {
        alert('Incorrect username or PIN.');
        return;
      }

      const index = this.accounts.findIndex(acc => acc.username === this.currentAccount.username);
      if (index !== -1) {
        // Delete account
        this.accounts.splice(index, 1);

        // Logout and hide UI
        this.$emit('logout');
        alert('Account closed successfully');
      }
    }
  }
};
</script>

<style scoped>
.operation-form {
  margin-top: 2rem;
  background-color: #ffdbdb;
  padding: 2rem;
  border-radius: 10px;
}

h4 {
  color: #333;
}

button {
  background-color: #ff5f5f;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #ff7f7f;
}
</style>
