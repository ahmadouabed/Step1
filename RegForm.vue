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

-----------------------------
// RegistrationForm.spec.js

import { shallowMount } from '@vue/test-utils'
import RegistrationForm from '@/components/RegistrationForm.vue'

describe('RegistrationForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(RegistrationForm)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call addFormData method and update formData', () => {
    const mockData = { key: 'fullname', value: 'John Doe' }
    wrapper.vm.addFormData(mockData)
    expect(wrapper.vm.formData.fullname).toBe('John Doe')
  })

  it('should handle form submission correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    wrapper.vm.formData = {
      fullname: 'John Doe',
      nickname: 'Johnny',
      age: 25,
      birthday: '2000-01-01',
      email: 'john@example.com',
      phonenumber: '09123456789',
      personality: 'Extrovert',
      gender: 'Male',
      love: ['Quality Time', 'Acts of Service', 'Words of Affirmation'],
      motto: 'Live and Let Live'
    }

    wrapper.vm.formAddHandling()

    expect(consoleSpy).toHaveBeenCalledWith('Data Added:', wrapper.vm.formData)
    expect(alertSpy).toHaveBeenCalledWith('Form Submitted!')
    expect(wrapper.emitted().addKaibigan[0]).toEqual([wrapper.vm.formData])
    expect(wrapper.vm.resetKaibiganId).toBe(1)

    consoleSpy.mockRestore()
    alertSpy.mockRestore()
  })

  it('should reset formData correctly', () => {
    wrapper.vm.resetKaibigan()
    expect(wrapper.vm.resetKaibiganId).toBe(1)
  })

  it('should validate form correctly', () => {
    wrapper.vm.formData = {
      fullname: '',
      nickname: 'J',
      age: '101',
      birthday: '',
      email: 'invalid-email',
      phonenumber: 'invalid-number',
      personality: '',
      gender: '',
      love: ['Love1', 'Love2', 'Love3', 'Love4'],
      motto: ''
    }

    // Call the checkValidity method
    wrapper.vm.checkValidity()

    // Check that isError is true after validation
    expect(wrapper.vm.isError).toBe(true)

    // Check that the formData has been reset according to validation rules
    expect(wrapper.vm.formData.fullname).toBe('')
    expect(wrapper.vm.formData.age).toBe(0)
    expect(wrapper.vm.formData.birthday).toBe('')
    expect(wrapper.vm.formData.email).toBe('')
    expect(wrapper.vm.formData.phonenumber).toBe('')
    expect(wrapper.vm.formData.personality).toBe(null)
    expect(wrapper.vm.formData.gender).toBe(null)
    expect(wrapper.vm.formData.love).toEqual([])
    expect(wrapper.vm.formData.motto).toBe('')
  })

  it('should handle event correctly', () => {
    const formAddHandlingSpy = jest.spyOn(wrapper.vm, 'formAddHandling')
    wrapper.vm.eventHandler('Submit')
    expect(formAddHandlingSpy).toHaveBeenCalled()
  })
})


-------------------------------------

Explanation of the Test File:
Setup: The beforeEach function initializes a fresh instance of the RegistrationForm component before each test. This ensures that tests are isolated from each other.

Testing addFormData: This test checks if the addFormData method correctly updates the formData object.

Testing formAddHandling: This test verifies that when the form is submitted, the data is logged, an alert is shown, and the addKaibigan event is emitted with the correct form data.

Testing resetKaibigan: This test checks if the resetKaibigan method correctly increments the resetKaibiganId.

Testing checkValidity: This test ensures that the checkValidity method correctly identifies invalid data and resets the formData as expected.

Testing eventHandler: This test checks if the eventHandler correctly calls the formAddHandling method when the action is 'Submit'.


---------------------------------------------------------

// RegistrationForm.spec.js
import { shallowMount } from '@vue/test-utils';
import RegistrationForm from '@/components/RegistrationForm.vue';
import CommonTextInput from '@/components/common/CommonTextInput.vue';
import CommonDropdown from '@/components/common/CommonDropdown.vue';
import CommonTextArea from '@/components/common/CommonTextArea.vue';
import CommonRadio from '@/components/common/CommonRadio.vue';
import CommonCheckbox from '@/components/common/CommonCheckbox.vue';
import CommonButton from '@/components/common/CommonButton.vue';

describe('RegistrationForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegistrationForm, {
      stubs: {
        CommonTextInput,
        CommonDropdown,
        CommonTextArea,
        CommonRadio,
        CommonCheckbox,
        CommonButton
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the form with components correctly', () => {
    expect(wrapper.find('b-form').exists()).toBe(true);
    expect(wrapper.findAllComponents(CommonTextInput).exists()).toBe(true);
    expect(wrapper.findAllComponents(CommonDropdown).exists()).toBe(true);
    expect(wrapper.findAllComponents(CommonTextArea).exists()).toBe(true);
    expect(wrapper.findAllComponents(CommonRadio).exists()).toBe(true);
    expect(wrapper.findAllComponents(CommonCheckbox).exists()).toBe(true);
    expect(wrapper.findAllComponents(CommonButton).exists()).toBe(true);
  });

  it('handles form submission by calling formAddHandling', () => {
    const spy = jest.spyOn(wrapper.vm, 'formAddHandling');
    wrapper.vm.eventHandler('Submit');
    expect(spy).toHaveBeenCalled();
  });

  it('adds form data correctly with addFormData', () => {
    const data = { key: 'fullname', value: 'John Doe' };
    wrapper.vm.addFormData(data);
    expect(wrapper.vm.formData.fullname).toBe('John Doe');
  });

  it('checks validity of the form with checkValidity', () => {
    wrapper.setData({
      formData: {
        fullname: 'John Doe',
        nickname: 'Johnny',
        age: '25',
        birthday: '2000-01-01',
        email: 'john.doe@example.com',
        phonenumber: '09123456789',
        personality: 'Extrovert',
        gender: 'Male',
        love: ['words', 'time', 'gifts'],
        motto: 'Live and let live'
      }
    });
    wrapper.vm.checkValidity();
    expect(wrapper.vm.isError).toBe(false);
  });

  it('sets error when invalid data is provided', () => {
    wrapper.setData({
      formData: {
        fullname: '',
        nickname: '',
        age: '150',
        birthday: '',
        email: 'invalid-email',
        phonenumber: '12345',
        personality: '',
        gender: '',
        love: ['words'],
        motto: ''
      }
    });
    wrapper.vm.checkValidity();
    expect(wrapper.vm.isError).toBe(true);
  });

  it('calls resetKaibigan to reset form data', () => {
    wrapper.vm.formData.fullname = 'John Doe';
    wrapper.vm.resetKaibigan();
    expect(wrapper.vm.formData.fullname).toBe('');
    expect(wrapper.vm.resetKaibiganId).toBe(1);
  });

  it('handles form submission and emits addKaibigan event', async () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    wrapper.setData({
      formData: {
        fullname: 'John Doe',
        nickname: 'Johnny',
        age: '25',
        birthday: '2000-01-01',
        email: 'john.doe@example.com',
        phonenumber: '09123456789',
        personality: 'Extrovert',
        gender: 'Male',
        love: ['words', 'time', 'gifts'],
        motto: 'Live and let live'
      }
    });
    await wrapper.vm.formAddHandling();
    expect(spy).toHaveBeenCalledWith('Form Submitted!');
    expect(wrapper.emitted().addKaibigan).toBeTruthy();
    spy.mockRestore();
  });
});


or

-------------------------------------------------------

import { shallowMount } from '@vue/test-utils';
import RegistrationForm from '@/components/pages/Slamboo/RegistrationForm.vue';

describe('RegistrationForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(RegistrationForm, {
      global: {
        stubs: {
          component: false
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.destroy();
  });

  it('should render the component and child components correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('b-form').exists()).toBe(true);
  });

  it('should call addFormData method and update formData', () => {
    const mockData = { key: 'fullname', value: 'Sample Man' };
    wrapper.vm.addFormData(mockData);
    expect(wrapper.vm.formData.fullname).toBe('Sample Man');
  });

  it('should handle form submission correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    wrapper.setData({
      formData: {
        fullname: 'Sample Man',
        nickname: 'Sample',
        age: '25',
        birthday: '2000-01-01',
        email: 'sample@example.com',
        phonenumber: '09123456789',
        personality: 'Extrovert',
        gender: 'Male',
        love: ['Quality Time', 'Acts of Service', 'Words of Affirmation'],
        motto: 'Live and Let Live'
      },
      isError: false
    });

    wrapper.vm.formAddHandling();

    expect(consoleSpy).toHaveBeenCalledWith('Data Added:', wrapper.vm.formData);
    expect(alertSpy).toHaveBeenCalledWith('Form Submitted!');
    expect(wrapper.emitted().addKaibigan[0]).toEqual([wrapper.vm.formData]);
    expect(wrapper.vm.resetKaibiganId).toBe(1);

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('should reset formData correctly', () => {
    wrapper.setData({
      formData: {
        fullname: 'Sample Man',
        nickname: 'Sample',
        age: '25',
        birthday: '2000-01-01',
        email: 'sample@example.com',
        phonenumber: '09123456789',
        personality: 'Extrovert',
        gender: 'Male',
        love: ['Quality Time', 'Acts of Service', 'Words of Affirmation'],
        motto: 'Live and Let Live'
      }
    });

    wrapper.vm.resetKaibigan();
    expect(wrapper.vm.formData).toEqual({
      fullname: '',
      nickname: '',
      age: '',
      birthday: '',
      email: '',
      phonenumber: '',
      personality: '',
      gender: '',
      love: [],
      motto: ''
    });
    expect(wrapper.vm.resetKaibiganId).toBe(1);
  });

  it('should validate form correctly - invalid data', () => {
    wrapper.setData({
      formData: {
        fullname: '',
        nickname: '',
        age: '150',  // Invalid age
        birthday: '',
        email: 'invalid-email',  // Invalid email
        phonenumber: '12345',  // Invalid phone number
        personality: '',
        gender: '',
        love: [],
        motto: ''
      },
      isError: false
    });

    wrapper.vm.checkValidity();
    expect(wrapper.vm.isError).toBe(true);
  });

  it('should validate form correctly - valid data', () => {
    wrapper.setData({
      formData: {
        fullname: 'Sample Man',
        nickname: 'Sample',
        age: '25',
        birthday: '2000-01-01',
        email: 'sample@example.com',
        phonenumber: '09123456789',
        personality: 'Extrovert',
        gender: 'Male',
        love: ['Quality Time', 'Acts of Service', 'Words of Affirmation'],
        motto: 'Live and Let Live'
      }
    });

    wrapper.vm.checkValidity();
    expect(wrapper.vm.isError).toBe(false);
  });

  it('should handle event correctly', () => {
    const formAddHandlingSpy = jest.spyOn(wrapper.vm, 'formAddHandling');
    wrapper.vm.eventHandler('Submit');
    expect(formAddHandlingSpy).toHaveBeenCalled();
  });
});


-----------------------------------------------------------

Trial Black

import { shallowMount } from '@vue/test-utils'
import RegistrationForm from '@/components/pages/Slamboo/RegistrationForm.vue'

describe('RegistrationForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(RegistrationForm)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('if Component is called', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should call addFormData method and update formData', () => {
    const mockData = { key: 'fullname', value: 'Sample Man' }
    wrapper.vm.addFormData(mockData)
    expect(wrapper.vm.formData.fullname).toBe('Sample Man')
  })

  it('should handle form submission correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    wrapper.vm.formData = {
      fullname: 'Sample Man',
      nickname: 'Sample',
      age: 25,
      birthday: '2000-01-01',
      email: 'sample@example.com',
      phonenumber: '09123456789',
      personality: 'Extrovert',
      gender: 'Male',
      love: ['Quality Time', 'Acts of Service', 'Words of Affirmation'],
      motto: 'Live and Let Live'
    }

    wrapper.vm.formAddHandling()

    expect(consoleSpy).toHaveBeenCalledWith('Data Added:', wrapper.vm.formData)
    expect(alertSpy).toHaveBeenCalledWith('Form Submitted!')
    expect(wrapper.emitted().addKaibigan[0]).toEqual([wrapper.vm.formData])
    expect(wrapper.vm.resetKaibiganId).toBe(1)

    consoleSpy.mockRestore()
    alertSpy.mockRestore()
  })

  it('should not submit the form if invalid', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    
    // Set invalid form data
    wrapper.vm.formData = {
      fullname: '',
      nickname: '',
      age: '',
      birthday: '',
      email: '',
      phonenumber: '',
      personality: '',
      gender: '',
      love: [],
      motto: ''
    }

    wrapper.vm.formAddHandling()

    expect(consoleSpy).not.toHaveBeenCalled()
    expect(alertSpy).not.toHaveBeenCalled()
    expect(wrapper.emitted().addKaibigan).toBeUndefined()
  })

  it('should reset formData correctly', () => {
    wrapper.vm.resetKaibigan()
    expect(wrapper.vm.resetKaibiganId).toBe(1)
  })

  it('should validate form correctly', () => {
    wrapper.vm.formData = {
      fullname: '',
      nickname: '',
      age: '',
      birthday: '',
      email: '',
      phonenumber: '',
      personality: '',
      gender: '',
      love: [],
      motto: ''
    }

    wrapper.vm.checkValidity()

    expect(wrapper.vm.isError).toBe(true)
    expect(wrapper.vm.formData.fullname).toBe('')
    expect(wrapper.vm.formData.age).toBe(0) // Assuming the action resets age to 0
    expect(wrapper.vm.formData.birthday).toBe('')
    expect(wrapper.vm.formData.email).toBe('')
    expect(wrapper.vm.formData.phonenumber).toBe('')
    expect(wrapper.vm.formData.personality).toBe('')
    expect(wrapper.vm.formData.gender).toBe('')
    expect(wrapper.vm.formData.love).toEqual([])
    expect(wrapper.vm.formData.motto).toBe('')
  })

  it('should handle event correctly', () => {
    const formAddHandlingSpy =
