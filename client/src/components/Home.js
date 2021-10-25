import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import {Modal,Button} from 'react-bootstrap'
class Home extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			selectedFile: null,
			selectedFiles: null,
			title: '',
			isOpen: false
		}
		
	}

	openModal = () => this.setState({ isOpen: true });
	closeModal = () => this.setState({ isOpen: false });

	multipleFileChangedHandler = (event) => {
		this.setState({
			selectedFiles: event.target.files
		});
		console.log( event.target.files );
	};


	multipleFileUploadHandler = () => {
		const data = new FormData();
		let selectedFiles = this.state.selectedFiles;
		let title = this.state.title;
		data.append('title', title);
// If file selected
		if ( selectedFiles ) {
			for ( let i = 0; i < selectedFiles.length; i++ ) {
				data.append( 'galleryImage', selectedFiles[ i ], selectedFiles[ i ].name );
			}
			axios.post( '/api/profile/multiple-file-upload', data, {
				headers: {
					'accept': 'application/json',
					'Accept-Language': 'en-US,en;q=0.8',
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			})
				.then( ( response ) => {
					console.log( 'res', response );
					if ( 200 === response.status ) {
						// If file size is larger than expected.
						if( response.data.error ) {
							if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
								this.ocShowAlert( 'Max size: 2MB', 'red' );
							} else if ( 'LIMIT_UNEXPECTED_FILE' === response.data.error.code ){
								this.ocShowAlert( 'Max 4 images allowed', 'red' );
							} else {
								// If not the given ile type
								this.ocShowAlert( response.data.error, 'red' );
							}
						} else {
							// Success
							let fileName = response.data;
							console.log( 'fileName', fileName );
							this.ocShowAlert( 'File Uploaded', '#3089cf' );
						}
					}
				}).catch( ( error ) => {
				// If another error
				this.ocShowAlert( error, 'red' );
			});
		} else {
			// if file not selected throw error
			this.ocShowAlert( 'Please upload file', 'red' );
		}
	};

	// ShowAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
			alertEl = document.createElement( 'div' ),
			textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
			$( alertEl ).fadeOut( 'slow' );
			$( alertEl ).remove();
		}, 3000 );
	};

	render() {
		console.log( this.state );
		return(
			<>
			<div className="container" style={{paddingTop:'3%',paddingLeft:'10%',paddingRight:'10%'}}>
				{/* For Alert box*/}
				
				
				{/* Multiple File Upload */}
				<div className="card" >
					<div className="card-header">
						<h4>Dhvani ADR</h4>
						
					</div>
					<div className="card-body">
				
						<p className="card-title">Please select the Dataset</p>
						<input type="file"  directory="" webkitdirectory="" accept="image/*" onChange={this.multipleFileChangedHandler}style={{paddingLeft:'10%'}} />
						<Button variant="primary" onClick={this.openModal}style={{marginTop:'5%'}}>
          					  Upload
        				  </Button>
					</div>
				</div>
				<div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
         </div>
        </div>
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
		<div id="oc-alert-container"></div>
          <Modal.Header closeButton>
		  
            <Modal.Title>Enter Dataset Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>

		  
		  <label >Dataset Name</label>
             <input type="text" onChange={(e) => this.setState({title:e.target.value}) } placeholder="enter name" className="form-control"/>
                    
			<button className="btn btn-info" onClick={this.multipleFileUploadHandler} style={{marginTop:'3%'}}>Upload!</button>
			
		  </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
		</>
		);
	}
}

export default Home;