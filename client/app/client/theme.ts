import { extendTheme, VStack } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const fontFamily = `
  "Lexend Deca",
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

VStack.defaultProps = { ...VStack.defaultProps, align: "start" }

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
    gray: {
      100: "#F2F2f2",
      200: "#E6E6E6",
      300: "#DADADA",
      400: "#999999",
      500: "#666666",
      600: "#333333",
      700: "#141414",
      800: "#000000",
    },
    blue: {
      100: "white",
      200: "#6a75a9",
      300: "#576399",
      400: "#cdcdcd",
      500: "#b7b7b7",
      600: "#a5a5a5",
    },
    text: {
      100: "rgba(255, 255, 255, 1)",
      // legacy
      200: "#eeeeee",
      300: "#e5e5e5",
      400: "#cdcdcd",
      500: "#b7b7b7",
      600: "#a5a5a5",
      // new styles
      80: "rgba(255, 255, 255, 0.8)",
      60: "rgba(255, 255, 255, 0.6)",
      40: "rgba(255, 255, 255, 0.4)",
      20: "rgba(255, 255, 255, 0.2)",
    },
    // ...colors,
    lightTransparent: "rgba(60, 60, 60, 0.5)",
    bgPrimary: "hsla(222, 20%, 7%, 1)",
    bgSecondary: "#121317",
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
    VStack: {
      baseStyle: {
        align: "start",
      },
    },
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
    Kbd: {
      baseStyle: {
        verticalAlign: "middle",
        color: "text.500",
        borderBottom: "1px",
        borderColor: "borderLight",
      },
    },
  },
  styles: {
    global: {
      ".highlight-em mark": {
        fontStyle: "normal",
        px: 1,
        py: "2px",
        borderRadius: "sm",
        fontWeight: "medium",
        color: "inherit",
        bg: "rgb(108 109 155 / 20%)",
      },
      ".post-body--ucube hr": {
        my: 5,
        borderColor: "borderLight",
      },
      "*, *::before, ::after": {
        borderColor: "borderLight",
      },
      body: {
        borderColor: "borderLight",
        bg: "bgPrimary",
        color: "text.100",
      },
    },
  },
  textStyles: {
    "heading-lg": {
      // you can also use responsive styles
      fontSize: ["16px", "20px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
    heading: {
      fontSize: ["16px", "18px"],
      fontWeight: "semibold",
    },
    "heading-sm": {
      fontSize: ["14px"],
      fontWeight: "semibold",
    },
    "text-sm": {
      fontSize: ["11px", "12px"],
    },
    text: {
      fontSize: ["12px", "14px"],
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
