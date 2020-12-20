import React, { useLayoutEffect, useContext, Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Context from '../utils/context';
import TrackerTable from './TrackerTable';
import Wave from 'react-wavify';
import { Line } from 'react-chartjs-2';
import '../css/Tracker.css';

const Tracker = () => {
    
    let history = useHistory();
    const context = useContext(Context);
    const [graphOption, setGraphOption] = useState('Daily Glucose');
    const [graphData, setGraphData] = useState([]);
    const [separatedData, setSeparatedData] = useState({x: [], y: []});
    const [graphColour, setGraphColour] = useState('');
    const [data, setData] = useState([]);
    let sortedData = [];
    let count = 0;

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 1139.59) {
            document.getElementById('inner-graph').classList.add("inner-graph-container-resize");
        } else {
            if (document.getElementById('inner-graph').classList.contains('inner-graph-container-resize')) {
                document.getElementById('inner-graph').classList.remove("inner-graph-container-resize");
            }
        }
    });

    useLayoutEffect(() => {
        context.assignShowNav(true);
    }, []);

    useEffect(() => {
        if (undefined !== data) {
            let tempSeparatedData = [];

            sortedData = data;
    
            sortedData.sort((a, b) => new Date(a.dateTested).getTime() - new Date(b.dateTested).getTime())
    
            for (let i = 0; i < sortedData.length; i++) {
                sortedData[i].dateTested = new Date(sortedData[i].dateTested);
            }
    
            for (let i = 0; i < sortedData.length; i += count) {
                let tempArray = [sortedData[i]];
                count = 1;
                for (let j = i + 1; j < sortedData.length; j++) {
                    if ((sortedData[i].dateTested.getFullYear() === sortedData[j].dateTested.getFullYear()) && (sortedData[i].dateTested.getMonth() === sortedData[j].dateTested.getMonth()) && (sortedData[i].dateTested.getDate() === sortedData[j].dateTested.getDate())){
                        tempArray.push(sortedData[j]);
                        count++;
                    } else {
                        break;
                    }
                }
                tempSeparatedData.push(tempArray);
            }
    
            console.log(tempSeparatedData);
            setSeparatedData(tempSeparatedData);
        }
    }, [data]);

    const getFormattedDate = (date) => {
        let day = `${date.getDate()}`;
        let month = `${date.getMonth() + 1}`;
        let year = `${date.getFullYear()}`;
        
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return year + '-' + month + '-' + day;
    }

    const populateGraphData = (graph) => {
        let tempGraphData = {x: [], y: []};
        for (let i = 0; i < separatedData.length; i++){
            let sum = 0;
            for (let j = 0; j < separatedData[i].length; j++){
                sum += separatedData[i][j][`${graph}`];
            }
            tempGraphData.x.push(getFormattedDate(separatedData[i][0].dateTested));
            tempGraphData.y.push(sum/separatedData[i].length);
        }
        console.log(tempGraphData);
        setGraphData(tempGraphData);
    }
    
    useEffect(() => {
        if (graphOption === 'Height') {
            populateGraphData('height');
            setGraphColour('rgba(142, 68, 173');
        } else if (graphOption === 'Hours of Sleep') {
            populateGraphData('hours');
            setGraphColour('rgba(227, 161, 67');
        } else if (graphOption === 'Weight') {
            populateGraphData('weight');
            setGraphColour('rgba(39, 174, 96');
        } else if (graphOption === 'BMI') {
            populateGraphData('bmi');
            setGraphColour('rgba(192, 57, 43');
        } else {
            populateGraphData('dailyGlucose');
            setGraphColour('rgba(15, 76, 130');
        }
    }, [graphOption, separatedData]);

    const assignData = (table_data) => {
        setData(table_data);
    }

    return (
        <Fragment>
            <div className='tracker-background-container'></div>
            <div className='tracker-page-main-container'>
                <div className='tracker-main-container'>
                    <TrackerTable stateData={data}
                                  assignData={(table_data) => assignData(table_data)}/>       
                </div>
                <div className='tracker-hist-main-container'>
                    <Wave fill='#f6f6f6'
                        paused={false}
                        className='tracker-wave tracker-wave-1'
                        options={{
                        height: 15,
                        amplitude: 20,
                        speed: 0.15,
                        points: 4
                        }}
                    />

                    <Wave fill='#fff'
                        paused={false}
                        className='tracker-wave tracker-wave-2'
                        options={{
                        height: 20,
                        amplitude: 25,
                        speed: 0.15,
                        points: 3
                        }}
                    />
                    <h1 className='tracker-title'>Analytics</h1>
                    <div className='tracker-graphs-container'>
                            <div id='inner-graph' className='inner-graph-card'>
                                <h4 className='tracker-title'>{graphOption} vs. Date</h4>
                                <div className='graph-options'>
                                    <button onClick={() => setGraphOption('Daily Glucose')} className={`graph-button graph-button-left text-nowrap ${(graphOption === 'Daily Glucose') ? 'graph-blue' : 'graph-hover'}`}>Daily Glucose</button>
                                    <button onClick={() => setGraphOption('Hours of Sleep')} className={`graph-button text-nowrap ${(graphOption === 'Hours of Sleep') ? 'graph-orange' : 'graph-hover'}`}>Hours of Sleep</button>
                                    <button onClick={() => setGraphOption('Weight')} className={`graph-button text-nowrap ${(graphOption === 'Weight') ? 'graph-green' : 'graph-hover'}`}>Weight</button>
                                    <button onClick={() => setGraphOption('Height')} className={`graph-button text-nowrap ${(graphOption === 'Height') ? 'graph-purple' : 'graph-hover'}`}>Height</button>
                                    <button onClick={() => setGraphOption('BMI')} className={`graph-button graph-button-right text-nowrap ${(graphOption === 'BMI') ? 'graph-red' : 'graph-hover'}`}>BMI</button>
                                </div>
                                <div id='main-graph' className='main-graph-container'>
                                    <Line
                                        data={{
                                            labels: graphData.x,
                                            datasets: [{
                                                label: 'Values',
                                                data: graphData.y,
                                                backgroundColor: `${graphColour}, 0.5`,
                                                borderColor: `${graphColour}, 1)`,
                                                borderWidth: 2
                                            }]
                                        }}
                                        height={600}
                                        options={{
                                            maintainAspectRatio: false,
                                            legend: {
                                                display: false
                                            },
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    }
                                                }]
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export default Tracker; 
