import { EmptyUseremailError } from '../exception/empty-useremail.error';
import { UserEmail } from './user-email';
import { UserIsAdmin } from './user-is-admin';

describe('User Is Admin VO', () => {
  it('creates a user is admin VO false', () => {
    const email = UserIsAdmin.fromBoolean(false);

    expect(email.value).toBe(false);
  });

  it('creates a user is admin VO true', () => {
    const email = UserIsAdmin.fromBoolean(true);

    expect(email.value).toBe(true);
  });
});
