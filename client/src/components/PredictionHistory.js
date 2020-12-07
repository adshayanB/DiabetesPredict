import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import '../css/PredictionHistory.css';

const PredictionHistory = (props) => {

    const [columns, setColumns] = useState([
        { title: 'ID', field: 'data_id', hidden:true },
        { title: 'Pregnancies', field: 'pregnancies', type: 'numeric' },
        { title: 'Glucose', field: 'glucose', type: 'numeric'},
        { title: 'Bloodpressure', field: 'bp', type: 'numeric' },
        { title: 'Skin Thickness', field: 'st', type: 'numeric' },
        { title: 'Insulin', field: 'insulin', type: 'numeric'},
        { title: 'BMI', field: 'bmi', type: 'numeric' },
        { title: 'DPF', field: 'dpf', type: 'numeric' },
        { title: 'Age', field: 'age', type: 'numeric' },
        { title: 'Date & Time', field: 'dateTime', type: 'datetime', defaultSort: 'desc'},
        {
            title: 'Result',
            field: 'result',
            render: rowData => {
                return(
                (rowData.result) ? <div className='positive-container'>POSITIVE</div> : <div className='negative-container'>NEGATIVE</div>
                );
            }
        }

      ]);
  
    const [data, setData] = useState([]);

    useEffect(async () => {
        if (localStorage.getItem('token')){
        
            const response = await fetch('/api/predictData', {
                headers: {
                'x-access-tokens': localStorage.getItem('token')
                }
            });

            const json = await response.json();

            setData(json.userData);

            console.log('updated Prediction History')
        }
    }, [props.stateUpdatePredictHistory]);

    const deletePrediction = async (data) => {
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
        title="Predictions"
        columns={columns}
        data={data}
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (localStorage.getItem('token')){

                  deletePrediction(oldData);

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
            exportButton:true
          }}
      />
    )
  }

  export default PredictionHistory;