import { JwtData } from './all';

declare global {
  namespace Express {
    interface Request {
      user?: JwtData; // Optional user property for attaching the decoded token info
    }
  }
}
