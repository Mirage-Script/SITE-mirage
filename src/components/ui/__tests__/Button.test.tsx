import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { Button } from '../Button';

describe('Button', () => {
  it('renders label text', () => {
    render(<Button>Test Label</Button>);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});
