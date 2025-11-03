import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';

import { HeroSection } from '../HeroSection';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    useReducedMotion: jest.fn(() => true)
  };
});

describe('HeroSection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot when prefers-reduced-motion is enabled', () => {
    const { container } = render(<HeroSection />);

    expect(container).toMatchSnapshot();
  });
});
