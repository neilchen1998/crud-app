import { FC, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "../styles/ParameterReadOnlyPage.css";

const DropdownPage: FC = () => {

    const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);
    const [selectedItem, setSelectedItem]= useState<string>(() => sessionStorage.getItem('selectedItem') || "not available");

    useEffect(() => {
      const fetDropdownData = async () => {

        try {
          const items = await invoke<DropdownItem[]>("get_dropdown_items");

          setDropdownItems(items);
        } catch (e) {
            console.error(`Error fetching dropdown items: ${e}`);
        }
      };

      fetDropdownData();

    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedItem(event.target.value);
      sessionStorage.setItem('selectedItem', event.target.value);
    }

    return (
      <div className='parameter-page'>
        <h1>Welcome to the Parameter Value Page!</h1>
        <div>
          <label htmlFor="myDropdown">Select an option:</label>
          <select id="myDropdown" value={selectedItem} onChange={handleSelectChange}>
            <option value="" disabled>
              -- Select an option --
            </option>
            {dropdownItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {selectedItem && <p>You selected: {selectedItem}</p>}
        </div>
      </div>
    );
};

export default DropdownPage;
