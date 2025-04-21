import { FC, useState } from "react";
import { openHeaderFile } from "../library/FileExplorer"
import "../styles/FilePage.css";

interface FileResult {
  filePath: string | null;
  fileContent: string | null;
}

const FilePage: FC = () => {

  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleOpenHeaderFile = async () => {
    console.log('The user clicks open file');
    
    try {
      const {filePath, fileContent}: FileResult = await openHeaderFile();

      setFileContent(fileContent);

    } catch (e) {
      
    }
  }

  return (
    <>
      <h1>Welcome to the File Page!</h1>
      <textarea readOnly value={fileContent === null ? 'Select a header file.' : fileContent}></textarea>
      <button onClick={handleOpenHeaderFile}>Open File</button>
    </>
  );
};

export default FilePage;