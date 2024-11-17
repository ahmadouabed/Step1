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



Here’s a structured breakdown to tackle your “Puppy Company Blog” challenge:

1. Database Design (ERD)

Your database design should consist of the following tables:

Tables:

	1.	Puppies
	•	puppy_id (Primary Key)
	•	name (String)
	•	breed (String)
	•	age (Integer)
	•	owner_id (Foreign Key, Nullable - links to Owners table)
	2.	Owners
	•	owner_id (Primary Key)
	•	name (String)
	•	contact_info (String)

ERD:

	•	Puppies has a foreign key relationship to Owners.
	•	When a puppy is adopted, the owner_id in the Puppies table will be updated.

2. Component Diagram

The application could have the following Vue components:
	1.	HomeComponent: Displays the homepage content.
	2.	PuppyRegistrationComponent: Handles adding new puppy data.
	3.	PuppyListComponent: Displays the list of puppies in a table format.
	•	Includes delete and update (adoption) functionality.
	4.	OwnerUpdateComponent: Allows updating owner information for a puppy.

3. Class Diagram

The class diagram will include the following entities:

Classes:

	1.	Puppy
	•	Attributes:
	•	id: Number
	•	name: String
	•	breed: String
	•	age: Number
	•	owner: Owner | null
	•	Methods:
	•	addPuppy()
	•	deletePuppy()
	•	updateOwner()
	2.	Owner
	•	Attributes:
	•	id: Number
	•	name: String
	•	contactInfo: String
	•	Methods:
	•	addOwner()

4. Dataset Diagram

Example dataset (mock data):

	•	Puppies

puppy_id	name	breed	age	owner_id
1	Max	Labrador	2	NULL
2	Bella	Poodle	1	1
3	Rocky	German Shep	3	NULL


	•	Owners

owner_id	name	contact_info
1	John Smith	john@example.com

5. Features Implementation

Frontend (Vue.js):

	•	Use Vue Router for navigation between components.
	•	Use Vuex or Pinia for state management to sync UI with the DB.

Backend:

	•	API Endpoints (Using Node.js/Express or similar):
	•	POST /puppies: Adds a new puppy.
	•	GET /puppies: Fetches all puppies.
	•	DELETE /puppies/:id: Deletes a puppy.
	•	PUT /puppies/:id/owner: Updates the owner for a puppy.

Database:

	•	Use MySQL/PostgreSQL to store puppy and owner data.
	•	Use Sequelize/Prisma for ORM if applicable.

Would you like a specific diagram generated or code snippets to help you implement any part?


