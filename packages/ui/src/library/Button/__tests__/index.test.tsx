import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, describe, it } from "vitest";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "..";
import { Settings } from "lucide-react";

describe("Button Component", () => {
  it("renders with children text", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("renders with badge when withBadge is true", () => {
    render(<Button withBadge badgeCount={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders icon only when hasIconOnly is true", () => {
    render(
      <Button hasIconOnly iconDescription="Settings">
        <Settings data-testid="icon" />
      </Button>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders prepend and append correctly", () => {
    render(
      <Button
        prepend={<span data-testid="prepend">P</span>}
        append={<span data-testid="append">A</span>}
      >
        Middle
      </Button>
    );
    expect(screen.getByTestId("prepend")).toBeInTheDocument();
    expect(screen.getByTestId("append")).toBeInTheDocument();
    expect(screen.getByText("Middle")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports asChild prop", () => {
    render(
      <Button asChild>
        <Slot>
          <a href="/test">Link</a>
        </Slot>
      </Button>
    );
    expect(screen.getByRole("link", { name: /link/i })).toBeInTheDocument();
  });
});
