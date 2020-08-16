import { EmptyUseremailError } from '../exception/empty-useremail.error';
import { UserEmail } from './user-email';

describe('User Email', () => {
  it('creates a user email VO', () => {
    const email = UserEmail.fromString('user@user.com');

    expect(email.value).toBe('user@user.com');
  });

  it('expects the email not to be empty', () => {
    expect(() => UserEmail.fromString('')).toThrow(EmptyUseremailError);
  });
});
