<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { message } from 'ant-design-vue'
import type { LoginRequest } from '@/service'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'
import { Longin } from '@/service/authApi'
import { AxiosError } from 'axios'

const authStore = useAuthStore()

const formLongin = ref<LoginRequest>({
  username: '',
  password: ''
})
const defaultWapperCol = {
  offset: 4,
  span: 14
}
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 5 }
}

const checkUsername = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('Please input your username!')
  } else if (value.length < 4 || value.length > 10) {
    return Promise.reject('Username should be 4 to 10')
  } else {
    return Promise.resolve()
  }
}
const checkPassword = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('Please input your password!')
  } else if (value.length < 4) {
    return Promise.reject('Password should be 4 ')
  } else {
    return Promise.resolve()
  }
}

const rule: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: checkUsername,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      validator: checkPassword,
      trigger: 'blur'
    }
  ]
}

const handleSubmit = async () => {
  try {
    const res = await Longin({
      username: formLongin.value.username,
      password: formLongin.value.password
    })
    if (res.status == 200) {
      if (res.data) {
        authStore.setToken(res.data)
      }
      router.push('home')
    }
  } catch (error: unknown) {
    if (typeof error === 'string') {
      message.error('error' + error)
    } else if (error instanceof AxiosError) {
      const axiosError = error as AxiosError
      const responseData = axiosError.response?.data as { message: string }
      message.error(responseData.message)
    }
  }
}
</script>

<template>
  <div class="content">
    <h2>login</h2>
    <a-form
      class="login-form"
      :model="formLongin"
      name="basic"
      :rules="rule"
      :label-col="layout.labelCol"
      :wrapper-col="layout.wrapperCol"
      autocomplete="off"
    >
      <a-form-item hasFeedback label="Username" name="username">
        <a-input v-model:value="formLongin.username">
          <template #prefix><UserOutlined /></template>
        </a-input>
      </a-form-item>

      <a-form-item hasFeedback label="Password" name="password">
        <a-input-password v-model:value="formLongin.password">
          <template #prefix><LockOutlined /></template>
        </a-input-password>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: defaultWapperCol.offset, span: defaultWapperCol.span }">
        <a-button html-type="submit" @click="handleSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.login-form {
  width: 100%;
  height: 400px;
  margin: 20px auto;
  padding: 50px 0 0;
}
</style>
