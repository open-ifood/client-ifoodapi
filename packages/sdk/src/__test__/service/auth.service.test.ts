import { assertNotEmpty } from '../../service/auth.service';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('assert not empty with empty value', () => {
  const messageToBethrow = 'message_exception';

  expect(() => {
    assertNotEmpty(messageToBethrow, '');
  }).toThrow(messageToBethrow);
});

test('assert not empty with any value', () => {
  const message = 'any message here';

  expect(assertNotEmpty('value', message)).toBe(message);
});
