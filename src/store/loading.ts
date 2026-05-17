export const useLoadingStore = defineStore('loading', () => {
  /**
   * 请求中的数量
   */
  const activeRequests = ref(0);

  /**
   * 全局 loading
   */
  const globalLoading = ref(false);

  /**
   * 是否正在 loading
   */
  const isLoading = computed(() => {
    return globalLoading.value;
  });

  /**
   * 开始 loading
   */
  const startLoading = () => {
    activeRequests.value++;

    globalLoading.value = true;
  };

  /**
   * 结束 loading
   */
  const stopLoading = () => {
    activeRequests.value = Math.max(0, activeRequests.value - 1);

    if (activeRequests.value === 0) {
      globalLoading.value = false;
    }
  };

  /**
   * 手动显示 loading
   */
  const showLoading = () => {
    globalLoading.value = true;
  };

  /**
   * 手动隐藏 loading
   */
  const hideLoading = () => {
    globalLoading.value = false;
  };

  /**
   * 重置 loading
   */
  const resetLoading = () => {
    activeRequests.value = 0;

    globalLoading.value = false;
  };

  return {
    // state
    activeRequests,
    globalLoading,

    // getter
    isLoading,

    // actions
    startLoading,
    stopLoading,
    showLoading,
    hideLoading,
    resetLoading
  };
});
