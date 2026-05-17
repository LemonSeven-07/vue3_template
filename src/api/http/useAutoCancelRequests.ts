import { cancelRequest } from '.';

/**
 * @description: 取消上一个页面的接口请求
 */
export function useAutoCancelRequests() {
  const route = useRoute();

  watch(
    () => route.fullPath,
    () => {
      console.log('取消请求');
      cancelRequest.cancelPendingRequests();
    }
  );
}
