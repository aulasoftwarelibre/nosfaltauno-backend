import { EmptyUseravatarError } from '../exception/empty-useravatar.error';
import { UserAvatar } from './user-avatar';

describe('User Avatar', () => {
  it('creates a avatar VO', () => {
    const avatar = UserAvatar.fromString('avatar.com');

    expect(avatar.value).toBe('avatar.com');
  });

  it('expects the avatar not to be empty', () => {
    expect(() => UserAvatar.fromString('')).toThrow(EmptyUseravatarError);
  });
});
