import { ComponentProps } from "react";

type Tvariant = "danger" | "success" | "primery" | "warning";
type Tbutton = ComponentProps<"button"> & { variant?: Tvariant };

function Button({ children , ...rest }: Tbutton) {
  return <button {...rest}>{children}</button>;
}

export default Button;
