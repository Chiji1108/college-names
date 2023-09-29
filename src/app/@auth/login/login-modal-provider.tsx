import { createContext, useState } from "react";
// import { useToggle } from "react-use";

export const LoginModalContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <LoginModalContext.Provider value={{ open, setOpen }}>
      {children}
    </LoginModalContext.Provider>
  );
};
