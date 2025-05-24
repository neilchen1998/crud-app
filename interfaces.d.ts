interface HeaderFileResult {
    headerFilePath: string | null;
    headerFileContent: string | null;
}

interface DropdownItem {
    id: number;
    name: string | null;
}

interface User {
    id: number;
    name: string;
    email: string | null;
}

interface Table {
    caption: string | null;
    entries: User[];
}
