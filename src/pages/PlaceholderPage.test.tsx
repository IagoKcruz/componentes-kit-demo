import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlaceholderPage } from "./PlaceholderPage";

describe("PlaceholderPage", () => {
  it("renders the given rotulo in the text", () => {
    render(<PlaceholderPage rotulo="Página 2" />);
    expect(screen.getByText(/Página 2/)).toBeInTheDocument();
  });
});
