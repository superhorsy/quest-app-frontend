import React, {useContext} from 'react';

const themes = {
  christmas: {
    rightBlock: "#2e7d32",
    Text: "#ffffff",
    leftBlock: "#dd2c00",
  },
  light: {
    foreground: "#000000",
    background: "#cb1414"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

export const CouponTest = () => {
  return (
    <ThemeContext.Provider value={themes.light}>
      <Toolbar/>
    </ThemeContext.Provider>
  );
};


function Toolbar(props) {
  return (
    <div>
      <ThemedButton/>
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  // console.log("theme", theme)

  return (
    <button style={{background: theme.background, color: theme.foreground}}>
      I am styled by theme context!
    </button>
  );
}