import React, { useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Popup } from '@progress/kendo-react-popup';
import icon from './theicon.png';  // Import the icon

const initialData = [
  { SecurityName: 'Adani Power Limited', SecurityCode: 'Sec124', Currency: 'Swiss Franc', SecurityLongName: 'Adani Power Limited', EffectiveIssueDate: '01/01/1900', ParentSecurity: 'AIA GROUP LTD', TypeDescription: '', Description: 'Describes whether the company conducts in...', ActiveStatus: 'Active' },
  { SecurityName: 'Agnico Eagle Mines Limited', SecurityCode: 'SEC021', Currency: 'Canadian Dollar', SecurityLongName: 'Agnico Eagle Mines Limited', EffectiveIssueDate: '12/31/1899', ParentSecurity: '', TypeDescription: '', Description: 'Describes whether the company conducts in...', ActiveStatus: 'Active' },
  { SecurityName: 'AIA GROUP LTD', SecurityCode: 'SEC000041', Currency: 'Hong Kong Dollar', SecurityLongName: 'AIA GROUP LTD', EffectiveIssueDate: '01/01/1900', ParentSecurity: '', TypeDescription: '', Description: 'Describes whether the company conducts in...', ActiveStatus: 'Active' },
  { SecurityName: 'AIR LIQUIDE SA', SecurityCode: 'SEC000028', Currency: 'Euro', SecurityLongName: 'AIR LIQUIDE SA', EffectiveIssueDate: '01/01/1900', ParentSecurity: '', TypeDescription: '', Description: 'Describes whether the company conducts in...', ActiveStatus: 'Active' },
  { SecurityName: 'AIR LIQUIDE SA', SecurityCode: 'SEC000208', Currency: 'Euro', SecurityLongName: 'AIR LIQUIDE SA', EffectiveIssueDate: '02/02/2022', ParentSecurity: '', TypeDescription: 'Common Shares', Description: 'Describes whether the company conducts in...', ActiveStatus: 'Active' },
  { SecurityName: 'Alnylam Pharmaceuticals', SecurityCode: 'SEC032', Currency: 'Euro', SecurityLongName: 'Alnylam Pharmaceuticals', EffectiveIssueDate: '12/31/1899', ParentSecurity: '', TypeDescription: 'Common Shares', Description: 'Describes whether the company conducts in...', ActiveStatus: 'Active' }
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });

  const handleIconClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMenuPosition({ left: rect.left, top: rect.bottom });
    setShowMenu(!showMenu);
  };

  const handleMenuClick = (option) => {
    setShowMenu(false);
    if (option === 'excel') {
      console.log('Import to Excel');
    } else if (option === 'pdf') {
      console.log('Import to PDF');
    }
  };

  const MyHeaderCell = (props) => {
    const { title } = props;
    return (
      <div style={{ position: 'relative' }}>
        {title}
        <img
          src={icon}
          alt="icon"
          className="icon-hover"
          onClick={handleIconClick}
        />
      </div>
    );
  };

  return (
    <div className="App">
      <Grid
        data={process(data, { skip: 0, take: 10 })}
        pageable={true}
        sortable={true}
        filterable={true}
      >
        <GridColumn field="SecurityName" title="Security Name" />
        <GridColumn field="SecurityCode" title="Security Code" />
        <GridColumn field="Currency" title="Currency" />
        <GridColumn field="SecurityLongName" title="Security Long Name" />
        <GridColumn field="EffectiveIssueDate" title="Effective/Issue Date" />
        <GridColumn field="ParentSecurity" title="Parent Security" />
        <GridColumn field="TypeDescription" title="Type Description" />
        <GridColumn field="Description" title="Description" />
        <GridColumn field="ActiveStatus" title="Active Status" cell={ActiveCell} headerCell={MyHeaderCell} />
      </Grid>

      {showMenu && (
        <Popup
          show={showMenu}
          offset={menuPosition}
          className="context-menu"
          anchorAlign={{ horizontal: 'left', vertical: 'bottom' }}
          popupAlign={{ horizontal: 'left', vertical: 'top' }}
        >
          <ul>
            <li onClick={() => handleMenuClick('excel')}>Import to Excel</li>
            <li onClick={() => handleMenuClick('pdf')}>Import to PDF</li>
          </ul>
        </Popup>
      )}
    </div>
  );
};

const ActiveCell = (props) => {
  return (
    <td>
      <span className="k-chip k-chip-filled k-chip-success">
        <span className="k-chip-content">{props.dataItem[props.field]}</span>
      </span>
    </td>
  );
};

export default App;
