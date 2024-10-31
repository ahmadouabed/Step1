<template>
  <b-container fluid class="mx-auto my-2 w-100">
    <div v-for="btn in KAIBIGAN_BTN" :key="btn.id">
      <b-row>
        <b-col>
          <common-button :input="btn" @change="changePages"></common-button>
        </b-col>
      </b-row>
    </div>

    <div v-if="!showKaibigan">
      <registration-form @addKaibigan="pushToArray"></registration-form>
    </div>

    <div v-if="!showKaibiganList">
      <kaibigan-list :kaibigans="listahanKaibigan" @removebtn="removethis"></kaibigan-list>
    </div>

    <div class="noKaibigan">
      <b-card v-if="listahanKaibigan.length === 0 && showKaibigan">No Kaibigan</b-card>
    </div>
  </b-container>
</template>

<script>
import RegistrationForm from '@/components/pages/Slamboo/RegistrationForm.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import { KAIBIGANSWITCH } from '@/common/recipe/rButtonRecipe'
import CommonTextInput from '@/components/common/CommonTextInput.vue'
import { TEXTINPUTPROPERTIES } from '@/common/recipe/rTextInputRecipe'
import KaibiganList from '@/components/pages/Slamboo/KaibiganList.vue'

export default {
  name: 'Kaibigan',
  components: { RegistrationForm, CommonButton, CommonTextInput, KaibiganList },

  data() {
    return {
      items: [...TEXTINPUTPROPERTIES],

      KAIBIGAN_BTN: KAIBIGANSWITCH,
      showKaibigan: true,
      showKaibiganList: true,
      listahanKaibigan: []
    }
  },

  methods: {
    /**
     * Function to push the data of listahanKaibigan to kaibigan
     * @param {object} kaibigan - parameter to push the array to it
     */

    pushToArray(kaibigan) {
      this.listahanKaibigan.unshift({
        kaibigan: kaibigan,
        activeKaibigan: false,
        activeFavourite: false
      })
    },

    /**
     * Function to remove the first id of listahanKaibigan
     * @param {array} id - parameter to get the id of listahanKaibigan
     */

    removethis(id) {
      this.listahanKaibigan.splice(id, 1)
    },

    /**
     * Function to change pages of website depending on action taken
     * @param {string} action - parameter to determine the action of button
     */

    changePages(action) {
      if (action === 'AddKaibigan') {
        this.showKaibigan = false
        this.showKaibiganList = true
      } else if (action === 'pakitaKaibigan') {
        if (this.listahanKaibigan.length === 0) alert('No kaibigan, Kindly Add')
        this.showKaibiganList = false
        this.showKaibigan = true
      }
    },

    /**
     * Function to reset the form
     * @param {string} event - parameter to determine the event of form
     * @return {Object} return the clearValue function
     */

    resetKaibigans(event) {
      const clear = confirm('Are you sure you want to remove Kaibigans?')
      if (!clear) {
        event.preventDefault()
        return
      }
      this.clearValue()
    }
  }
}
</script>

<style scoped>
.noKaibigan {
  padding-top: 10px;
  text-align: center;
}

h1 {
  text-align: center;
}
</style>
