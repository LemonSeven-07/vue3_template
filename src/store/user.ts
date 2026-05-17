export const useUserStore = defineStore('user', () => {
  const token = ref('');

  const userInfo = ref<{ id: number; username: string } | null>(null);

  const login = async () => {
    token.value = 'token_123';

    userInfo.value = {
      id: 1,
      username: 'jack'
    };
  };

  const logout = () => {
    token.value = '';

    userInfo.value = null;
  };

  return {
    token,
    userInfo,
    login,
    logout
  };
});
