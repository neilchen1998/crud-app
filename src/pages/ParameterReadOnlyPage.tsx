import { FC, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "../styles/ParameterReadOnlyPage.css";

const ParameterReadOnlyPage: FC = () => {

    const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
    const [table, setTable] = useState<Table>();

    useEffect(() => {
      const fetchTable = async () => {
        try {
          // Set the loading status to true
          setLoadingStatus(true);

          // Call get_table in Rust
          const table = await invoke<Table>('get_table');

          setTable(table);
        } catch (e) {
          console.error(`Error fetching table: ${e}`);
        } finally {
          // Reset the loading status to false
          setLoadingStatus(false);
        }
      }
      fetchTable();
    }, []);

    // Check if the loading status is true, if so then shows laoding instead
    if (loadingStatus) {
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

export default ParameterReadOnlyPage;
