import Settings from '../config/settings';
import { DateUtil } from '../utils/date.util';

class TokenBucket {
    burst: number;
    sustained: number;
    lastFilled: number;
    tokens: number;

    constructor(burst: number, sustained: number) {
        this.burst = burst;
        this.sustained = sustained;

        this.lastFilled = DateUtil.getTimeNowSeconds();
        this.tokens = burst;
    }

    take() {
        this.refill();

        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }

        return false;
    }

    refill() {
        const now = DateUtil.getTimeNowSeconds();

        const minutesSinceLastRefill = (now - this.lastFilled) / Settings.REVOLUTIONS_RATE;

        const tokensToAdd = Math.floor(minutesSinceLastRefill * this.sustained); 
        const refilledTokens = this.tokens + tokensToAdd;

        this.tokens = Math.min(this.burst, refilledTokens);

        const timeCreditedWithTokens = (tokensToAdd / this.sustained) * Settings.REVOLUTIONS_RATE;
        this.lastFilled += timeCreditedWithTokens
    }
}

export default TokenBucket;
