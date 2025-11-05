import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { CaseShowcase } from '../CaseShowcase';
import { DeliveryPlaybook } from '../DeliveryPlaybook';
import { OperationalHighlights } from '../OperationalHighlights';
import { ServicesOverview } from '../ServicesOverview';
import { StatsCounter } from '../StatsCounter';
import { TestimonialsCarousel } from '../TestimonialsCarousel';

describe('Animation Components - Tokens Applied', () => {
  it('StatsCounter renders without errors', () => {
    const { container } = render(<StatsCounter />);
    expect(container).toBeTruthy();
  });

  it('TestimonialsCarousel renders without errors', () => {
    const { container } = render(<TestimonialsCarousel />);
    expect(container).toBeTruthy();
  });

  it('ServicesOverview renders without errors', () => {
    const { container } = render(<ServicesOverview />);
    expect(container).toBeTruthy();
  });

  it('CaseShowcase renders without errors', () => {
    const { container } = render(<CaseShowcase />);
    expect(container).toBeTruthy();
  });

  it('DeliveryPlaybook renders without errors', () => {
    const { container } = render(<DeliveryPlaybook />);
    expect(container).toBeTruthy();
  });

  it('OperationalHighlights renders without errors', () => {
    const { container } = render(<OperationalHighlights />);
    expect(container).toBeTruthy();
  });

  it('No emoji characters in rendered output', () => {
    const { container: statsContainer } = render(<StatsCounter />);
    const statsText = statsContainer.textContent || '';
    const emojiRegex = /[\p{Emoji}]/gu;
    expect(statsText.match(emojiRegex)).toBeNull();

    const { container: testimonialsContainer } = render(<TestimonialsCarousel />);
    const testimonialsText = testimonialsContainer.textContent || '';
    expect(testimonialsText.match(emojiRegex)).toBeNull();
  });
});

