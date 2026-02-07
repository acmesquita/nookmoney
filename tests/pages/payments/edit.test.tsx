import { Decimal } from "@prisma/client/runtime";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EditPayment } from "~/pages/payments/edit";
import { z } from "zod";

jest.mock("remix-forms", () => ({
  Form: ({
    children,
    values,
  }: {
    children: (props: unknown) => React.ReactNode;
    values?: Record<string, unknown>;
  }) => {
    const register = (name: string) => ({
      name,
      ...(values && values[name] !== undefined && { defaultValue: String(values[name]) }),
    });
    const Field = ({ name, children }: { name: string; children: (p: { errors: string[]; Label: () => null }) => React.ReactNode }) =>
      name ? <>{children({ errors: [], Label: () => null })}</> : null;
    const Errors = () => null;
    const Button = ({ children }: { children: React.ReactNode }) => <button type="submit">{children}</button>;
    return (
      <form data-testid="edit-payment-form">
        {typeof children === "function" ? children({ Field, Errors, Button, register }) : null}
      </form>
    );
  },
}));

const schema = z.object({
  id: z.string(),
  description: z.string().min(3),
  category: z.string(),
  currentMonth: z.string(),
  userId: z.string(),
  dueDate: z.date(),
  amount: z.number(),
});

const mockPayment = {
  id: "payment-1",
  currentMonth: new Date("2024-01-01"),
  category: "casa",
  description: "Aluguel",
  dueDate: new Date("2024-01-10"),
  amount: new Decimal(1500),
  paid: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "user-1",
};

describe("EditPayment", () => {
  it("renders with title and Back link", () => {
    render(
      <MemoryRouter>
        <EditPayment schema={schema} payment={mockPayment} userId="user-1" />
      </MemoryRouter>
    );

    expect(screen.getByText("Edit Payment")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute("href", "/payments");
  });

  it("renders form with payment data", () => {
    render(
      <MemoryRouter>
        <EditPayment schema={schema} payment={mockPayment} userId="user-1" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("edit-payment-form")).toBeInTheDocument();
  });
});
