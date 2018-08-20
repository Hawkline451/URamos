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
        code: null,
        courses: null,
    };

    getTeacherAndNotesInfo(name) {
        // 142.93.4.35
        axios({
            method: 'post',
            url: 'http://142.93.4.35:3000/teacher/teacherCourses/',
            data: 'value=' + name,
            responseType: 'json',
        }).then(({data}) => {
            const {xlabel, teacherData} = data;
            xLabel = xlabel;
            this.setState({
                courses: teacherData,
                name: name,
            });
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.name !== this.props.name){
            this.getTeacherAndNotesInfo(this.props.name);
        }
    }

    componentWillMount() {
        const {name} = this.props;
        console.log(name);
        this.getTeacherAndNotesInfo(name);
    }

    render() {
        if (this.state.courses !== null) {
            const options = {
                theme: "light2",
                animationEnabled: true,
                title: {
                    text: "Evaluación de los cursos del profesor"
                },
                subtitles: [{
                    text: "Filtra haciendo click sobre el curso"
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
                data: this.state.courses.map(classes => {
                    let xPosition = -1;
                    return {
                        type: "line",
                        name: classes.subject,
                        showInLegend: true,
                        dataPoints: classes.notes.map(note => {
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

