/**
 * 局部 loading 管理（企业增强版）
 *
 * 特点：
 * - 支持并发请求（不会提前关闭）
 * - 支持计数控制
 */
export function useLocalLoading() {
  /**
   * 当前 loading 状态
   */
  const loading = ref(false);

  /**
   * 请求计数（防止并发问题）
   */
  let count = 0;

  /**
   * 包装 Promise
   */
  const withLoading = async <T>(promise: Promise<T>): Promise<T> => {
    /**
     * 进入一个请求
     */
    count++;
    loading.value = true;

    try {
      const res = await promise;
      return res;
    } finally {
      /**
       * 请求结束
       */
      count--;

      /**
       * 只有所有请求结束才关闭 loading
       */
      if (count <= 0) {
        loading.value = false;
        count = 0;
      }
    }
  };

  return {
    loading,
    withLoading
  };
}
