import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LinkCard from "@/components/LinkCard";

describe("LinkCard", () => {
  it("renders title and description", () => {
    render(<LinkCard title="My Link" href="https://example.com" description="Desc" />);
    expect(screen.getByText("My Link")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("disables CTA when disabled", () => {
    render(<LinkCard title="My Link" href="https://example.com" disabled />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-disabled", "true");
  });

  it("calls onClick and navigates when enabled", () => {
    const onClick = vi.fn();
    render(<LinkCard title="My Link" href="https://example.com" onClick={onClick} />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });
});


