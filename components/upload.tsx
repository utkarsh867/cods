import { Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Canvas from "./canvas";

export default function Upload() {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [labels, setLabels] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const base64_images: string[] = await Promise.all(
      acceptedFiles.map((img) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(img);
        });
      })
    );
    const results = await Promise.all(
      base64_images.map(async (base64_image) => {
        const response = await axios.post("/api/infer", {
          image: base64_image,
        });
        setCurrentImage(base64_image);
        return response.data;
      })
    );
    setLabels(results[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Flex
        maxW="6xl"
        mx="auto"
        py="28"
        justifyContent="center"
        borderWidth="medium"
        borderStyle="dashed"
        borderRadius="md"
        my={10}
        background="gray.50"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag image here</p>}
      </Flex>
      <Flex justifyContent="center">
        <Canvas image={currentImage} labels={labels} />
      </Flex>
    </>
  );
}
