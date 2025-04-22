import { FC, useState } from "react";
import { openHeaderFile, openEEPROMFile } from "../library/FileExplorer"
import "../styles/FilePage.css";

const FilePage: FC = () => {

  const [headerFilePath, setHeaderFilePath] = useState<string | null>(() => sessionStorage.getItem('headerFilePath') || null);
  const [headerFileContent, setHeaderFileContent] = useState<string | null>(() => sessionStorage.getItem('headerFileContent') || null);
  const [eepromFilePath, setEEPROMFilePath] = useState<string | null>(() => sessionStorage.getItem('eepromFilePath') || null);

  const handleOpenHeaderFile = async () => {
    console.log('The user clicks open header file button');

    // Get the response from the function call
    try {
      const {headerFilePath, headerFileContent}: HeaderFileResult = await openHeaderFile();

      // Make sure both values are valid
      if (headerFilePath && headerFileContent) {
        // Cache the content in the session storage so it will presist throughout the session
        sessionStorage.setItem('headerFilePath', headerFilePath);
        sessionStorage.setItem('headerFileContent', headerFileContent);

        // Set the states
        setHeaderFilePath(headerFilePath);
        setHeaderFileContent(headerFileContent);
      }

    } catch (e) {
      console.error(`Can not open the selected header file: ${e}`);
    }
  }

  const handleOpenEEPROMFile = async () => {
    console.log('The user clicks open EEPROM file button');

    // Get the response from the function call
    try {
      const eepromFilePath = await openEEPROMFile();

      // Make sure both values are valid
      if (eepromFilePath) {
        // Cache the content in the session storage so it will presist throughout the session
        sessionStorage.setItem('eepromFilePath', eepromFilePath);

        // Set the states
        setEEPROMFilePath(eepromFilePath);
      }

    } catch (e) {
      console.error(`Can not open the selected EEPROM file: ${e}`);
    }
  }

  return (
    < div className='file-page'>
      <h1>Welcome to the File Page!</h1>
      <h2>Current header file path: {headerFilePath === null ? 'No file is selected.' : headerFilePath}</h2>
      <textarea readOnly value={headerFileContent === null ? 'Select a header file.' : headerFileContent}></textarea>
      <button className='open-header-button' onClick={handleOpenHeaderFile}>Open Header File</button>
      <h2>Current EEPROM file path: {eepromFilePath === null ? 'No file is selected.' : eepromFilePath}</h2>
      <button className='open-eeprom-button' onClick={handleOpenEEPROMFile}>Open EEPROM File</button>
    </ div>
  );
};

export default FilePage;