import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
