import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentShowcase } from "./ComponentShowcase";

describe("ComponentShowcase", () => {
  it("renders the label for every kit component", () => {
    render(<ComponentShowcase />);
    expect(screen.getByText("TextBox")).toBeInTheDocument();
    expect(screen.getByText("NumericInput")).toBeInTheDocument();
    expect(screen.getByText("MaskedInput (CPF)")).toBeInTheDocument();
    expect(screen.getByText("ComboBox")).toBeInTheDocument();
  });

  it("renders an input for TextBox", () => {
    render(<ComponentShowcase />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThan(0);
  });
});
