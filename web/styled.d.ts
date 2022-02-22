// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
    };
    colors: {
      purple: string;
      red: string;
      lightPurple: string;
      lightPurpleHover: string;
      brightGreen: string;
      brightPink: string;
      brightYellow: string;
      brightPurple: string;
      mutedPurple1: string;
      mutedPurple1Hover: string;
      mutedPurple2: string;
      mutedPurple2Hover: string;
      mutedPurple4: string;
      mutedPurple5: string;
      mutedGray3: string;
    };
    shadows: {
      shadowLarge: string;
      input: string;
    },
    fonts: {
      roboto: string;
      playRegular: string;
      playBold: string;
      monsterratRegular: string;
      monsterratBold: string;
    }
  }
}
