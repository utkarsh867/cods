import { Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Header() {
  return (
    <Flex alignItems="center" p={10} justifyContent="space-between">
      <Flex alignItems="center">
        <Flex px={4}>
          <Image src="/makerbaylogo.png" alt="me" width="224" height="64" />
        </Flex>
        <Heading>Coral Object Detection System</Heading>
      </Flex>
    </Flex>
  );
}
