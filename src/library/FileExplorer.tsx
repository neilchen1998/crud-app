import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';

export async function openHeaderFile(): Promise<HeaderFileResult> {
    // Try to open a header file
    try {
            const selected = await open({
                read: true,
                multiple: false,
                directory: false,
                filters: [
                    { name: 'Header files', extensions: ['h', 'hpp']},
                ],
                title: 'Select a header file',
            });

            if (!selected) {
                console.error('The user cancelled the selection.');
                return {headerFilePath: null, headerFileContent: null};
            }

            console.log(`${selected}`);

            try {
                const fileContent = await readTextFile(selected);

                // Return the text
                return {headerFilePath: selected, headerFileContent: fileContent};
            } catch (e) {
                console.error(`Cannot read the header file: ${e}`);
                return {headerFilePath: selected, headerFileContent: null};
            }
    } catch (e) {
        console.error(e);
        return {headerFilePath: null, headerFileContent: null};
    }
}

export async function openEEPROMFile(): Promise<string | null> {
    
    // Try to open an EEPROM file
    try {
            const selected = await open({
                read: true,
                multiple: false,
                directory: false,
                filters: [
                    { name: 'EEPROM files', extensions: ['eep', 'hex']},
                ],
                title: 'Select an EEPROM file',
            });

            if (!selected) {
                console.error('The user cancelled the selection.');
                return null;
            }

            return selected;

            console.log(`${selected}`);
    } catch (e) {
        console.error(e);
        return null;
    }
}
