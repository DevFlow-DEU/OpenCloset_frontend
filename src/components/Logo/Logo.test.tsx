import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Logo from './Logo';

test('OPENCLOSET 텍스트를 렌더링한다', async () => {
  const screen = await render(<Logo />);
  await expect.element(screen.getByText('OPENCLOSET')).toBeInTheDocument();
});
