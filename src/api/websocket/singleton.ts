import { WebSocketManager } from './manager';
import { config } from '@/config';

/**
 * WebSocket 单例管理器（连接层）
 *
 * 职责：
 * 1. 只维护一个 WebSocket 实例
 * 2. 控制“创建 / 销毁 / 重建”
 * 3. 不关心业务状态（完全解耦 Pinia）
 */
class WebSocketSingleton {
  /**
   * WebSocketManager 单例实例
   */
  private static instance: WebSocketManager | null = null;

  /**
   * 当前连接绑定的用户ID
   * 用于判断是否需要重连
   */
  private static currentUserId: string | null = null;

  /**
   * 当前 token（认证信息）
   */
  private static currentToken: string | null = null;

  /**
   * =========================
   * 获取 WebSocket 实例
   * =========================
   * @param userId 用户ID
   * @param token 登录token
   */
  static getInstance(userId?: string, token?: string): WebSocketManager | null {
    /**
     * 未登录：不创建连接
     */
    if (!userId || !token) return null;

    /**
     * 判断是否“用户发生变化”
     * - 切换账号
     * - token刷新
     */
    const userChanged = this.currentUserId !== userId || this.currentToken !== token;

    /**
     * 如果用户变化 => 必须销毁旧连接
     */
    if (userChanged && this.instance) {
      this.destroy();
    }

    /**
     * 更新当前用户信息
     */
    this.currentUserId = userId;
    this.currentToken = token;

    /**
     * 如果没有实例才创建
     */
    if (!this.instance) {
      /**
       * 创建 WebSocketManager（底层封装）
       */
      this.instance = new WebSocketManager(config.WEBSOCKET_URL + `?token=${token}`);

      /**
       * 建立连接
       */
      this.instance.connect();

      console.log('✅ WebSocket 已连接');
    }

    return this.instance;
  }

  /**
   * =========================
   * 销毁 WebSocket
   * =========================
   * 用于：
   * - 登出
   * - token失效
   * - 主动断开
   */
  static destroy(): void {
    if (this.instance) {
      /**
       * 关闭底层连接
       */
      this.instance.close();

      this.instance = null;
    }

    /**
     * 清理用户信息
     */
    this.currentUserId = null;
    this.currentToken = null;

    console.log('🛑 WebSocket 已销毁');
  }
}

export { WebSocketSingleton };
