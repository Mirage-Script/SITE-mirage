import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { useReducedMotion } from 'framer-motion';

import { TextScramble } from '../TextScramble';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    useReducedMotion: jest.fn()
  };
});

describe('TextScramble', () => {
  const useReducedMotionMock = useReducedMotion as unknown as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders final text immediately when reduced motion is preferred', async () => {
    useReducedMotionMock.mockReturnValue(true);

    render(<TextScramble text="Mirage" autoPlay />);

    expect(await screen.findByText('Mirage')).toBeInTheDocument();
  });
});
