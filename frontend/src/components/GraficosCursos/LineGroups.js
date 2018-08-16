import axios from "axios";

/* App.js */
var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let xLabel = [];

class LineGroups extends Component {
    constructor() {
        super();
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }

    toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    state = {
        teachers: null,
        code: null,
    };

    getTeacherAndNotesInfo(code) {
        // 142.93.4.35
        axios({
            method: 'post',
            url: 'http://localhost:3000/search/searchprof/',
            data: 'value=' + code,
            responseType: 'json',
        }).then(({data}) => {
            const {xlabel, teacherData} = data;
            xLabel = xlabel;
            this.setState({
                teachers: teacherData,
                code: code,
            });
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.code !== this.props.code){
            this.getTeacherAndNotesInfo(this.props.code);
        }
    }

    componentWillMount() {
        const {code} = this.props;
        this.getTeacherAndNotesInfo(code);
    }

    render() {
        if (this.state.teachers !== null) {
            const options = {
                theme: "light2",
                animationEnabled: true,
                title: {
                    text: "Evaluación de Profesores dentro del curso"
                },
                subtitles: [{
                    text: "Filtra haciendo click sobre el profesor"
                }],
                axisX: {
                    title: "Año + Semestre"
                },
                axisY: {
                    title: "Nota",
                    titleFontColor: "#6D78AD",
                    lineColor: "#6D78AD",
                    labelFontColor: "#6D78AD",
                    tickColor: "#6D78AD",
                    includeZero: true
                },
                toolTip: {
                    shared: false
                },
                legend: {
                    horizontalAlign: "right",
                    verticalAlign: "center",
                    cursor: "pointer",
                    itemclick: this.toggleDataSeries
                },
                data: this.state.teachers.map(teacher => {
                    let xPosition = -1;
                    return {
                        type: "line",
                        name: teacher.teacher,
                        showInLegend: true,
                        dataPoints: teacher.notes.map(note => {
                            if (note === "NaN") {
                                note = NaN;
                            }
                            xPosition += 1;
                            return {label: xLabel[xPosition], y: note}
                        })
                    }
                })
            };
            return (
                <div>
                    <CanvasJSChart options={options}
                                   onRef={ref => this.chart = ref}
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            );
        } else {
            return <div></div>
        }

    }

}

export default LineGroups;

