import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import '../src/index.css';
import '../src/components/Fonts.css';
import 'react-day-picker/style.css';
import './storybook.css';

const preview: Preview = {
  decorators: [
    // Single global router — stories must not nest their own <Router>.
    // Use `parameters: { initialPath: '/...' }` to control the route instead.
    (Story, context) => (
      <MemoryRouter
        initialEntries={[
          (context.parameters?.initialPath as string | undefined) ?? '/',
        ]}
      >
        <div className="sb-mobile-viewport">
          <div className="sb-mobile-scroll">
            <Story />
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile 393×852',
          styles: { width: '393px', height: '852px' },
        },
      },
      defaultViewport: 'mobile',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
