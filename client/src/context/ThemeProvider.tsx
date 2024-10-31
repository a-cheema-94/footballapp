import { createContext, ReactNode, useMemo, useState } from "react";

type Props = {
  children: ReactNode;
};

// Theme context
export const ThemeContext = createContext({} as any);

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  const values = useMemo(() => ({ theme, toggleTheme }), [theme]); 
  // only if theme changes that the values object will be re created, resulting in fewer re renders of child components.

  return (
    <ThemeContext.Provider value={values}>
      <div data-bs-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
