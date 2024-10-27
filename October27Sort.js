<script>
export default {
  name: 'Bankerist',
  data() {
    return {
      loginUser: '',
      loginPin: '',
      currentAccount: null,
      isSorted: false,
      accounts: [
        {
          owner: 'Ahmad Ouabed',
          movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
          interestRate: 1.2,
          pin: 1234,
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
          owner: 'Admin Test',
          movements: [2500, 400, -260, 830, -4210, 2200, 4600, -70],
          interestRate: 1.8,
          pin: 1111,
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
          currency: 'USD',
          locale: 'en-US'
        }
      ]
    };
  },
  computed: {
    sortedMovements() {
      const movs = [...this.currentAccount.movements];
      return this.isSorted ? movs.sort((a, b) => a - b) : movs;
    }
  },
  methods: {
    handleLogin() {
      const account = this.accounts.find(
        (acc) =>
          acc.owner
            .toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('') === this.loginUser
      );
      if (account?.pin === +this.loginPin) {
        this.currentAccount = account;
      } else {
        alert('Invalid login credentials');
      }
    },
    sortMovements() {
      this.isSorted = !this.isSorted;
    },
    movementType(movement) {
      return movement > 0 ? 'movements__type--deposit' : 'movements__type--withdrawal';
    },
    formatMovementDate(dateString) {
      const date = new Date(dateString);
      const daysPassed = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
      if (daysPassed === 0) return 'Today';
      if (daysPassed === 1) return 'Yesterday';
      return daysPassed <= 7
        ? `${daysPassed} days ago`
        : new Intl.DateTimeFormat(this.account.locale).format(date);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat(this.currentAccount.locale, {
        style: 'currency',
        currency: this.currentAccount.currency
      }).format(value);
    }
  }
};
</script>
