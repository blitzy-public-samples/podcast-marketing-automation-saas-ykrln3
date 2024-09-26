import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../../src/components/common/Button';

describe('Button component', () => {
  it('renders button with text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonElement = getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies correct css class for variant', () => {
    const { getByRole } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="text">Text</Button>
      </>
    );

    const primaryButton = getByRole('button', { name: 'Primary' });
    const secondaryButton = getByRole('button', { name: 'Secondary' });
    const outlineButton = getByRole('button', { name: 'Outline' });
    const textButton = getByRole('button', { name: 'Text' });

    expect(primaryButton).toHaveClass('bg-primary text-white');
    expect(secondaryButton).toHaveClass('bg-secondary text-white');
    expect(outlineButton).toHaveClass('border border-primary text-primary');
    expect(textButton).toHaveClass('text-primary');
  });

  it('applies correct css class for size', () => {
    const { getByRole } = render(
      <>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </>
    );

    const smallButton = getByRole('button', { name: 'Small' });
    const mediumButton = getByRole('button', { name: 'Medium' });
    const largeButton = getByRole('button', { name: 'Large' });

    expect(smallButton).toHaveClass('px-2 py-1 text-sm');
    expect(mediumButton).toHaveClass('px-4 py-2 text-base');
    expect(largeButton).toHaveClass('px-6 py-3 text-lg');
  });

  it('disables button when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    const buttonElement = getByRole('button', { name: 'Disabled' });
    expect(buttonElement).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = getByRole('button', { name: 'Click me' });
    
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Button className="custom-class">Custom</Button>);
    const buttonElement = getByRole('button', { name: 'Custom' });
    expect(buttonElement).toHaveClass('custom-class');
  });
});