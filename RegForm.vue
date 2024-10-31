<template>
  <b-form @submit.prevent="formAddHandling">
    <div class="my-3" v-for="(item, id) in items" :key="id">
      <component
        :is="item.componentName"
        :key="resetKaibiganId"
        :input="item"
        @formData="addFormData"
        @change="eventHandler"
      ></component>
    </div>
  </b-form>
</template>

<script>
import CommonDropdown from '@/components/common/CommonDropdown.vue'
import { DROPDOWNPROPERTIES } from '@/common/recipe/rDropdownRecipe'
import CommonTextInput from '@/components/common/CommonTextInput.vue'
import { TEXTINPUTPROPERTIES } from '@/common/recipe/rTextInputRecipe'
import { TEXTAREAPROPERTIES } from '@/common/recipe/rTextArea'
import CommonTextArea from '@/components/common/CommonTextArea.vue'
import { RADIOPROPERTIES } from '@/common/recipe/rRadioRecipe'
import CommonRadio from '@/components/common/CommonRadio.vue'
import { CHECKBOXPROPERTIES } from '@/common/recipe/rCheckboxRecipe'
import CommonCheckbox from '@/components/common/CommonCheckBox.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import { BUTTONPROPERTIES } from '@/common/recipe/rButtonRecipe'
import { FORMTEMPLATE } from '@/common/recipe/rFormRecipe'

export default {
  name: 'RegistrationForm',
  components: {
    CommonTextInput,
    CommonDropdown,
    CommonTextArea,
    CommonRadio,
    CommonCheckbox,
    CommonButton
  },
  data() {
    return {
      items: [
        ...TEXTINPUTPROPERTIES,
        ...DROPDOWNPROPERTIES,
        ...RADIOPROPERTIES,
        ...CHECKBOXPROPERTIES,
        ...TEXTAREAPROPERTIES,
        ...BUTTONPROPERTIES
      ],
      formData: { ...FORMTEMPLATE },

      isError: false,
      resetKaibiganId: 0
    }
  },

  methods: {
    /**
     * Function to handle the submit button and break it once formAddHandling function is used
     * @param {object} action - used assign and get the action taken of case statement
     */

    eventHandler(action) {
      switch (action) {
        case 'Submit':
          this.formAddHandling()
          break
      }
    },

    /**
     * Function to assign value to key
     * @param {object} data - used to assign and get key and value variable
     */

    addFormData(data) {
      this.formData[data.key] = data.value
    },

    /**
     * Used to dislpay data to console log and check errors and resets the array
     */

    formAddHandling() {
      if (!this.checkValidity() && this.isError == false) {
        console.log('Data Added:', this.formData)
        alert('Form Submitted!')

        this.$emit('addKaibigan', this.formData)
        this.resetKaibigan()
      }
    },

    /**
     * Function to reset formData
     *
     */

    resetKaibigan() {
      this.formData
      this.resetKaibiganId += 1
    },

    /**
     * Function to check validity of forms
     */

    checkValidity() {
      const namePattern = /^[A-Za-z\s]+$/
      const agePattern = /^[1-9][0-9]$|^(100)$/
      const emailPatternTest = /^[a-z0-9._-]+@[a-z.-]+\.[a-zA-Z]{2,}$/
      const numberPattern = /^(09|\+639)\d{9}$/

      const validators = [
        {
          condition: () =>
            this.formData.fullname.length > 45 ||
            this.formData.fullname.trim() === '' ||
            !namePattern.test(this.formData.fullname),
          message: 'Fullname must not be greater than 45 characters or should not be blank',
          action: () => (this.formData.fullname = '')
        },
        {
          condition: () =>
            this.formData.nickname.length > 20 ||
            this.formData.nickname.trim() === '' ||
            !namePattern.test(this.formData.nickname),
          message: 'Nickname must not be greater than 20 characters or should not be blank',
          action: () => (this.formData.nickname = '')
        },
        {
          condition: () => !agePattern.test(this.formData.age),
          message: 'Invalid number, Must be above 10-100yrs Old',
          action: () => (this.formData.age = 0)
        },
        {
          condition: () => this.formData.birthday === '',
          message: 'Enter a birthday',
          action: () => (this.formData.birthday = '')
        },
        {
          condition: () => !emailPatternTest.test(this.formData.email),
          message: 'Invalid email format, include @ and no special characters',
          action: () => (this.formData.email = '')
        },
        {
          condition: () => !numberPattern.test(this.formData.phonenumber),
          message: 'Invalid Phone Number Format. Ex: 09123456789',
          action: () => (this.formData.phonenumber = '')
        },
        {
          condition: () => this.formData.personality === '' || this.formData.personality == null,
          message: 'Select your personality'
        },
        {
          condition: () => this.formData.gender === '' || this.formData.gender == null,
          message: 'Select your Gender'
        },
        {
          condition: () => this.formData.love.length !== 3,
          message: 'Pick your top 3 love languages',
          action: () => (this.formData.love = [])
        },
        {
          condition: () => this.formData.motto.trim() === '',
          message: 'Please enter your motto',
          action: () => (this.formData.motto = '')
        }
      ]

      for (const validator of validators) {
        if (validator.condition()) {
          alert(validator.message)
          if (validator.action) validator.action()
          this.isError = true
          return
        }
      }

      this.isError = false
    }
  }
}
</script>

<style scoped></style>
