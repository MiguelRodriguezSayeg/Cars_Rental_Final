import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InsertLocModal from './InsertLocModal'
import EditLocModal from './EditLocModal'
import DelLocModal from './DelLocModal'

export default class LocForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowingInsert: false,
      isShowingEdit: false,
      isShowingDel: false
    }
    this.openModalHandlerInsert = this.openModalHandlerInsert.bind(this);
    this.closeModalHandlerInsert = this.closeModalHandlerInsert.bind(this);
    this.openModalHandlerEdit = this.openModalHandlerEdit.bind(this);
    this.closeModalHandlerEdit = this.closeModalHandlerEdit.bind(this);
    this.openModalHandlerDel = this.openModalHandlerDel.bind(this);
    this.closeModalHandlerDel = this.closeModalHandlerDel.bind(this);
  }
  openModalHandlerInsert(){
        this.setState({
            isShowingEdit: false,
            isShowingInsert: true,
            isShowingDel:false
        });
    }

    closeModalHandlerInsert(){
        this.setState({
            isShowingInsert: false
        });
    }
    openModalHandlerEdit(){
          this.setState({
            isShowingDel: false,
              isShowingInsert: false,
              isShowingEdit: true
          });
      }

      closeModalHandlerEdit(){
          this.setState({
              isShowingEdit: false
          });
      }
      openModalHandlerDel(){
            this.setState({
                isShowingEdit: false,
                isShowingInsert: false,
                isShowingDel: true
            });
        }

        closeModalHandlerDel(){
            this.setState({
                isShowingDel: false
            });
        }
  render(){
    return (
      <div>
        { this.state.isShowingInsert ? <div onClick={this.closeModalHandlerInsert}></div> : null }
        { this.state.isShowingEdit ? <div onClick={this.closeModalHandlerEdit}></div> : null }
        { this.state.isShowingDel ? <div onClick={this.closeModalHandlerDel}></div> : null }
        <div class="d-flex flex-row bd-highlight mb-3 justify-content-center">
          <div class="p-2 bd-highlight">
            <button class="btn btn-primary" onClick={this.openModalHandlerInsert}>Insert</button>
          </div>
          <div class="p-2 bd-highlight">
            <button class="btn btn-dark" onClick={this.openModalHandlerEdit}>Edit</button>
          </div>
          <div class="p-2 bd-highlight">
            <button class="btn btn-danger" onClick={this.openModalHandlerDel}>Delete</button>
          </div>
        </div>
        <div>
        <InsertLocModal
                    className="modal"
                    show={this.state.isShowingInsert}
                    close={this.closeModalHandlerInsert}>
        </InsertLocModal>
        </div>
        <div>
        <EditLocModal
                    className="modal"
                    show={this.state.isShowingEdit}
                    close={this.closeModalHandlerEdit}>
        </EditLocModal>
        </div>
        <div>
        <DelLocModal
                    className="modal"
                    show={this.state.isShowingDel}
                    close={this.closeModalHandlerDel}>
        </DelLocModal>
        </div>
      </div>
    );
  }
}

if(document.getElementById('locform')){
	var locs = document.getElementById('locform');
	ReactDOM.render(<LocForm />, document.getElementById('locform'));
}
