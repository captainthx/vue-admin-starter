<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { message } from 'ant-design-vue';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import type { LoginRequest } from '@/types';
import { longin } from '@/service/authApi';

const { transfer } = useAuthStore();

const formLongin = ref<LoginRequest>({
  name: '',
  password: ''
});
const defaultWapperCol = {
  offset: 4,
  span: 14
};
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const checkUsername = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('Please input your username!');
  } else if (value.length < 4 || value.length > 10) {
    return Promise.reject('Username should be 4 to 10');
  } else {
    return Promise.resolve();
  }
};
const checkPassword = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('Please input your password!');
  } else if (value.length < 4) {
    return Promise.reject('Password should be 4 ');
  } else {
    return Promise.resolve();
  }
};

const rule = computed<Record<string, Rule[]>>(() => {
  return {
    name: [
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
  };
});

const handleSubmit = async () => {
  try {
    const res = await longin({
      name: formLongin.value.name,
      password: formLongin.value.password
    });
    if (res.status == 200) {
      if (res.data) {
        transfer(res);
      }
    }
  } catch (error: unknown) {
    if (typeof error === 'string') {
      message.error('error' + error);
    } else if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as { message: string };
      message.error(responseData.message);
    }
  }
};
</script>

<template>
  <div>
    <a-card class="centered" :title="$t('menu.login')" :style="{ width: '500px' }">
      <a-form
        class="login-form"
        :model="formLongin"
        name="basic"
        :rules="rule"
        :label-col="layout.labelCol"
        :wrapper-col="layout.wrapperCol"
        autocomplete="off"
      >
        <a-form-item hasFeedback label="Username" name="name">
          <a-input v-model:value="formLongin.name">
            <template #prefix><UserOutlined /></template>
          </a-input>
        </a-form-item>

        <a-form-item hasFeedback label="Password" name="password">
          <a-input-password v-model:value="formLongin.password">
            <template #prefix><LockOutlined /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
          <a-button html-type="submit" @click="handleSubmit" class="login-form-button"
            >Submit</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
}

.login-form {
  max-width: 500px;
}
.login-form-button {
  width: 100%;
}
</style>
@/types
