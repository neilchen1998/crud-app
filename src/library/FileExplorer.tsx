import { open } from '@tauri-apps/plugin-dialog';
import { readTextFile } from '@tauri-apps/plugin-fs';

interface FileResult {
    filePath: string | null;
    fileContent: string | null;
}

export async function openHeaderFile(): Promise<FileResult> {
    
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
                return {filePath: null, fileContent: null};
            }

            console.log(`${selected}`);

            try {
                const fileContent = await readTextFile(selected);

                // Return the text
                return {filePath: selected, fileContent: fileContent};
            } catch (e) {
                console.error(`Cannot read the header file: ${e}`);
                return {filePath: selected, fileContent: null};
            }


    } catch (e) {
        console.error(e);
        return {filePath: null, fileContent: null};
    }
}
