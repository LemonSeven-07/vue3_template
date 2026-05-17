import { WebSocketManager } from '@/api/websocket/manager';
import { WebSocketSingleton } from '@/api/websocket/singleton';

/**
 * WebSocket 业务状态管理（Pinia）
 *
 * 职责：
 * 1. 管理连接状态
 * 2. 提供业务方法（connect/disconnect）
 * 3. 给组件提供统一接口
 */
export const useWebSocketStore = defineStore('websocket', () => {
  /**
   * WebSocket 实例（来自 Singleton）
   */
  const socket = ref<WebSocketManager | null>(null);

  /**
   * 是否已连接
   */
  const connected = ref(false);

  /**
   * 当前用户ID
   */
  const userId = ref<string | null>(null);

  /**
   * 当前 token
   */
  const token = ref<string | null>(null);

  /**
   * =========================
   * 建立连接
   * =========================
   * 只负责“调用 Singleton”
   */
  const connect = (uid?: string, tk?: string) => {
    /**
     * 未登录不连接
     */
    if (!uid || !tk) return;

    /**
     * 防止重复连接（性能优化）
     */
    if (connected.value && userId.value === uid && token.value === tk) {
      return;
    }

    /**
     * 保存当前用户状态
     */
    userId.value = uid;
    token.value = tk;

    /**
     * 从 Singleton 获取 WebSocket
     */
    socket.value = WebSocketSingleton.getInstance(uid, tk);

    connected.value = true;
  };

  /**
   * =========================
   * 主动断开连接（登出）
   * =========================
   */
  const disconnect = () => {
    /**
     * 销毁底层连接
     */
    WebSocketSingleton.destroy();

    /**
     * 清理 store 状态
     */
    socket.value = null;
    connected.value = false;
    userId.value = null;
    token.value = null;
  };

  /**
   * =========================
   * 重连机制（可选）
   * =========================
   */
  const reconnect = () => {
    if (!userId.value || !token.value) return;

    WebSocketSingleton.destroy();

    socket.value = WebSocketSingleton.getInstance(userId.value, token.value);

    connected.value = true;
  };

  /**
   * =========================
   * 是否已登录 + 可连接
   * =========================
   */
  const isReady = computed(() => {
    return !!userId.value && !!token.value;
  });

  return {
    // state
    socket,
    connected,
    userId,
    token,

    // getters
    isReady,

    // actions
    connect,
    disconnect,
    reconnect
  };
});
