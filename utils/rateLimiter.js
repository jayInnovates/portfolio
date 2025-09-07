// Rate limiting utility for chat messages
class RateLimiter {
    constructor() {
        this.userRequests = new Map();
        this.maxRequestsPerHour = 50;
        this.windowMs = 60 * 60 * 1000; // 1 hour
    }

    isAllowed(userId) {
        const now = Date.now();
        const userKey = userId || 'anonymous';
        
        if (!this.userRequests.has(userKey)) {
            this.userRequests.set(userKey, []);
        }
        
        const requests = this.userRequests.get(userKey);
        
        // Remove old requests outside the time window
        const validRequests = requests.filter(timestamp => now - timestamp < this.windowMs);
        this.userRequests.set(userKey, validRequests);
        
        // Check if under limit
        if (validRequests.length >= this.maxRequestsPerHour) {
            return false;
        }
        
        // Add current request
        validRequests.push(now);
        return true;
    }

    getRemainingRequests(userId) {
        const userKey = userId || 'anonymous';
        const requests = this.userRequests.get(userKey) || [];
        const now = Date.now();
        const validRequests = requests.filter(timestamp => now - timestamp < this.windowMs);
        
        return Math.max(0, this.maxRequestsPerHour - validRequests.length);
    }

    getResetTime(userId) {
        const userKey = userId || 'anonymous';
        const requests = this.userRequests.get(userKey) || [];
        
        if (requests.length === 0) return null;
        
        const oldestRequest = Math.min(...requests);
        return new Date(oldestRequest + this.windowMs);
    }
}

export default new RateLimiter();
