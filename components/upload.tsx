import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";

export function MyDropzone() {
  const router = useRouter();
  const onDrop = useCallback(async (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = async (file) => {
      // Do something with the files
      console.log(acceptedFiles);
      const data = new FormData();
      data.append("file", acceptedFiles[0], acceptedFiles[0].name);
      const result = await fetch("/api/image/upload", {
        method: "post",
        credentials: "include",
        body: data,
      }).then((r) => r.json());
      router.push(`/image/${result.slug}`);
    };
    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input {...getInputProps()} />
        <div className="">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </form>
    </div>
  );
}
