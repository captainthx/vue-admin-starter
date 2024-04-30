import type { ApiResponse, TokenPayload, TokenResponse } from '../types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { AxiosResponse } from 'axios';
import router from '@/router';
import client from '@/service/request';
import { refresh } from '@/service/authApi';

const store = {
  get: () => localStorage.getItem('token'),
  set: (value: TokenResponse) => localStorage.setItem('token', JSON.stringify(value)),
  remove: () => localStorage.removeItem('token')
};

export const useAuthStore = defineStore('auth', () => {
  const token = ref<TokenResponse | null>(null);
  const payload = ref<TokenPayload | null>(null);
  const isAuthenticated = computed(() => token.value !== null && payload.value !== null);

  const transfer = (response: AxiosResponse<ApiResponse<TokenResponse>>) => {
    if (response.status === 200 && response.data.result) {
      token.value = response.data.result;
      store.set(token.value);

      const timeout = (token.value.accessTokenExpire - Math.floor(Date.now() / 1000) - 60) * 1000;
      const refreshText = token.value.refreshToken;
      setTimeout(async () => {
        await refreshAuth(refreshText);
      }, timeout);
      router.push({ name: 'layout' });
    }
  };

  const loadAuth = async () => {
    token.value = store.get() ? (JSON.parse(store.get() as string) as TokenResponse) : null;
    if (token.value) {
      payload.value = JSON.parse(atob(token.value.accessToken.split('.')[1]));

      if (token.value.accessTokenExpire - Math.floor(Date.now() / 1000) < 60) {
        await refreshAuth(token.value.refreshToken);
      }

      if (token.value.accessTokenExpire - Math.floor(Date.now() / 1000) < 0) {
        logout();
      }
      client.interceptors.request.use(
        (config) => {
          if (token.value) {
            config.headers.Authorization = `Bearer ${token.value.accessToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    } else {
      logout();
    }
  };

  const refreshAuth = async (refreshToken: string) => {
    try {
      await transfer(await refresh({ refreshToken }));
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    token.value = null;
    payload.value = null;
    store.remove();
    router.push({ name: 'login' });
  };
  return { token, payload, isAuthenticated, transfer, loadAuth, logout };
});
