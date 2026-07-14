import { User, UserDocument } from "./auth.model";

export class AuthRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async create(user: Partial<UserDocument>) {
    return User.create(user);
  }

  async findById(id: string) {
    return User.findById(id);
  }
}

export const authRepository = new AuthRepository();