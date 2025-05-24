import { FC, useEffect, useState, useSyncExternalStore } from "react";
import { invoke } from "@tauri-apps/api/core";
import "../styles/ParameterPage.css";

const ParameterPage: FC = () => {

    const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);
    const [selectedItem, setSelectedItem]= useState('');

    const [loading, setLoading] = useState<boolean>(true);
    const [table, setTable] = useState<Table>();

    useEffect(() => {
        const fetDropdownData = async () => {
          // Try to get dropdown items
          try {
              const items = await invoke<DropdownItem[]>("get_dropdown_items");

              setDropdownItems(items);
          } catch (e) {
              console.error(`Error fetching dropdown items: ${e}`);
          }
        };

        const fetchTable = async () => {
          try {
            setLoading(true);

            const table = await invoke<Table>('get_table');

            setTable(table);
          } catch (e) {
            console.error(`Error fetching table: ${e}`);
          } finally {
            setLoading(false);
          }
        }

        fetDropdownData();
        fetchTable();

    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(event.target.value);
    }

    if (loading) {
      return <div>Loading table data...</div>;
    }

    return (
      <div className='parameter-page'>
        <h1>Welcome to the Parameter List Page!</h1>
        <table>
  <caption>
    {table?.caption}
  </caption>
  <thead>
    <tr>
      <th scope="col">Person</th>
      <th scope="col">Most interest in</th>
      <th scope="col">Age</th>
    </tr>
  </thead>
  <tbody>
    {table?.entries.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    );
};

export default ParameterPage;
