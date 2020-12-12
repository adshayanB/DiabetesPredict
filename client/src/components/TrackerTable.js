import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
//import '../css/TrackerTable.css';

const TrackerTable = (props) => {
  const [columns, setColumns] = useState([
    //{ title: 'ID', field: 'data_id', hidden:true },
    { title: 'Daily Glucose', field: 'dailyGlucose', type: 'numeric' },
    { title: 'Hours of Sleep', field: 'hours', type: 'numeric'},
    { title: 'Weight', field: 'weight', type: 'numeric' },
    { title: 'Height', field: 'height', type: 'numeric' },
    { title: 'BMI', field: 'bmi', type: 'numeric', editable: 'never' },
    { title: 'Date & Time', field: 'dateTested', type: 'datetime', defaultSort: 'desc', editable: 'never'}
  ]);

const [updateTrackerTable, setUpdateTrackerTable] = useState(false);

useEffect(async () => {
    if (localStorage.getItem('token')){
    
        const response = await fetch('/api/trackDataAll', {
            headers: {
            'x-access-tokens': localStorage.getItem('token')
            }
        });

        const json = await response.json();

        props.assignData(json.userData);

        console.log('updated Tracker Table')
    }
}, [updateTrackerTable]);

const addTrack = async (data) => {
  
  if (localStorage.getItem('token')){
    console.log(data);
    const response = await fetch('/api/trackData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-tokens': localStorage.getItem('token')
      },
      body: JSON.stringify({
        dailyGlucose: data.dailyGlucose,
        hours: data.hours,
        weight: data.weight,
        height: data.height
      })
    });

    const json = await response.json();

    console.log(json);
  }

}

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
    data={props.stateData}
    editable={{
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {

            addTrack(newData);

            props.assignData([...props.stateData, newData]);

            setUpdateTrackerTable(!updateTrackerTable);
                
            resolve();
          }, 1000)
        }),
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataUpdate = [...props.stateData];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            props.assignData([...dataUpdate]);
  
            setUpdateTrackerTable(!updateTrackerTable);

            resolve();
          }, 1000)
        }),
      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (localStorage.getItem('token')){

              //deleteTrack(oldData);

              const dataDelete = [...props.stateData];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              props.assignData([...dataDelete]);

              setUpdateTrackerTable(!updateTrackerTable);

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

  