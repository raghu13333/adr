import React from "react";

import "../Login.css";
import axios from 'axios'

const options = [
	{
	  label: "Cat",
	  value: "cat",
	},
	{
	  label: "Traffic",
	  value: "traffic",
	},
	{
	  label: "Dog",
	  value: "dog",
	},
	
  ];

class Inference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      courses: [],
      course: "",
      model:'',
      dataset:''
    };
this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
		console.log("Model Selected!!");
		this.setState({ model: e.target.value });
	  };
    handleChangeDataset(e) {
      console.log("Dataset Selected!!");
      this.setState({ dataset: e.target.value });
      };
    


  handleChangeCourse = event => {
    this.setState({ course: event.target.value });
  };

  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  }
  

  componentDidMount() {
    
    axios.get('http://localhost:5000/files')
        .then(response => this.setState({ courses: response.data }));
}

  render() {


    const uniqueCouse = this.getUnique(this.state.courses, "dataset");

    const courses = this.state.courses;
    const course = this.state.course;

    const filterDropdown = courses.filter(function(result) {
      return result.dataset === course;
    });

    return (
      <div className="container">
        <div className="row">
          
        
          <div className="col-6"  style={{paddingBottom:"100px",paddingTop:"20px",alignItems:"center"}}>
          <label className=""style={{paddingTop:"5px",marginTop:"40px"}}>
          Dataset
            <select className="custom-select"
              value={this.state.course}
              onChange={this.handleChangeCourse} style={{paddingTop:"5px",marginTop:"10px"}}
            >
              <option>--Select--</option>
              {uniqueCouse.map(course => (
                <option key={course.id} value={course.dataset}>
                  {course.dataset}
                </option>
              ))}
            </select>
          </label>
          </div>
          <div className="col-6"  style={{paddingBottom:"100px",paddingTop:"20px",alignItems:"center"}}>
          <label className=""style={{paddingTop:"5px",marginTop:"40px"}}>
            Model
            <form method="post"  action="getJson">
            <select className="custom-select" name="example"
             value={this.state.model} onChange={this.handleChange} style={{paddingTop:"5px",marginTop:"10px"}}
            >
              <option>--Select--</option>
              {options.map((option) => (
              <option value={option.value}  onChange={(e) => this.setState({model:e.target.value})}>{option.label}</option>
            ))}
            </select>
            </form>
          </label>
          </div>
          
         
            {filterDropdown.map(course => (
             <div className="col-2">
              
              <input type="checkbox" id="myCheckbox1" />
              <label for="myCheckbox1" className="labell">
             <img key={course.id} src={`${course.path}`} height="80" className="card-img-top img-responsive" alt="img" />
            </label>
              
              
              </div>
            ))}
        </div>
        <button type="button" class="btn btn-success" style={{marginTop:"100px"}}>Inference</button>
      </div>
    );
  }
}
export default Inference;