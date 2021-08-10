// import colors from "tailwindcss/colors"
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const fontFamily = `
  "Inter",
  system-ui,
  -apple-system,
  'Segoe UI',
  Roboto,
  Helvetica,
  Arial,
  sans-serif,
  'Apple Color Emoji',
  'Segoe UI Emoji'
`

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "37em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

const theme = extendTheme({
  fonts: {
    body: fontFamily,
    heading: fontFamily,
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  breakpoints,
  colors: {
    // ...colors,
    bgPrimary: "#0D0F17",
    bgSecondary: "#11131d",
    bgTertiary: "#161927",
    borderSubtle: "#131621",
    borderLight: "#272e34",
    brand: {
      900: "#0D0F17",
      800: "#11121D",
      700: "#161927",
      600: "#1D2130",
      500: "#292F45",
      400: "#434D74",
      300: "#6978AE",
      200: "#95A4D6",
      100: "#C1CDF5",
    },
  },
  components: {
    Checkbox: {},
    NumberIncrementStepper: {
      baseStyle: {
        borderInlineStartColor: "borderSubtle",
      },
    },
    Input: {
      baseStyle: {
        borderColor: "borderSubtle",
      },
    },
  },
  styles: {
    global: {
      "*, *::before, ::after": {
        borderColor: "borderLight",
      },
      body: {
        borderColor: "borderLight",
        bg: "bgPrimary",
      },
    },
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
  layerStyles: {
    base: {
      bg: "bgPrimary",
      border: "2px solid",
      borderColor: "gray.500",
    },
    selected: {
      bg: "teal.500",
      color: "teal.700",
      borderColor: "orange.500",
    },
  },
})

export default theme
