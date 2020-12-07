import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
//import '../css/TrackerTable.css';

const TrackerTable = () => {
  const [columns, setColumns] = useState([
    //{ title: 'ID', field: 'data_id', hidden:true },
    { title: 'Daily Glucose', field: 'dailyGlucose', type: 'numeric' },
    { title: 'Hours', field: 'hours', type: 'numeric'},
    { title: 'Weight', field: 'weight', type: 'numeric' },
    { title: 'Height', field: 'height', type: 'numeric' },
    { title: 'Date & Time', field: 'dateTested', type: 'numeric'}
  ]);

const [data, setData] = useState([]);

useEffect(async () => {
    if (localStorage.getItem('token')){
    
        const response = await fetch('/api/trackDataAll', {
            headers: {
            'x-access-tokens': localStorage.getItem('token')
            }
        });

        const json = await response.json();

        setData(json.userData);

        console.log('updated Tracker Table')
    }
}, []);

const deleteTrack = async (data) => {
  const response = await fetch(`/api/predictData/${data.data_id}`,
  {
    method: 'DELETE',
    headers: {
              'x-access-tokens': localStorage.getItem('token')
            }
  })

  const json = await response.json();
              
  console.log(json);
}

return (
  <MaterialTable
    title="Tracker"
    columns={columns}
    data={data}
    editable={{
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            setData([...data, newData]);
                
            resolve();
          }, 1000)
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataUpdate = [...data];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setData([...dataUpdate]);
  
            resolve();
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (localStorage.getItem('token')){

              //deleteTrack(oldData);

              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
            }
            resolve()
          }, 1000)
        }),
    }}
    options={{
        rowStyle: rowData => ({
          backgroundColor: (rowData.tableData.id % 2 === 0) ? '#f6f6f6' : '#e6e6e6'
        }),
        exportButton:true,
        pageSize: 10
      }}
  />
)
  
    
  }

  export default TrackerTable;

  