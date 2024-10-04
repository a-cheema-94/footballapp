import { createContext, ReactNode, useMemo, useState } from "react";

type Props = {
  children: ReactNode
};

export const ThemeContext = createContext({} as any);

const ThemeProvider = ({ children }: Props) => {

  const [theme, setTheme] = useState<string>('light');

  const changeTheme = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

  const values = useMemo(() => ({ theme, changeTheme }), [theme])

  return (
    <ThemeContext.Provider value={values}>
      <div data-bs-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
