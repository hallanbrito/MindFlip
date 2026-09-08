import { AnalyticsEvent } from '../types';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private sessionId: string = Math.random().toString(36).substring(2, 9);

  constructor() {
    if (typeof window !== 'undefined') {
      this.trackEvent('session_started', {
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      });

      window.addEventListener('beforeunload', () => {
        this.trackEvent('session_finished', { sessionId: this.sessionId });
      });
    }
  }

  public trackEvent(eventName: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      data: {
        ...data,
        sessionId: this.sessionId
      },
      timestamp: Date.now()
    };

    this.events.push(event);

    // Keep memory clean
    if (this.events.length > 200) {
      this.events = this.events.slice(-100);
    }

    // Events stay only in this in-memory buffer.
  }

  public getRecentEvents(): AnalyticsEvent[] {
    return [...this.events];
  }
}

export const analytics = new AnalyticsService();

export function trackEvent(eventName: string, data?: Record<string, any>) {
  analytics.trackEvent(eventName, data);
}
