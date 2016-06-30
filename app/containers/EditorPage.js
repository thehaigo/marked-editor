import React,{Component,PropTypes} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ipcRenderer} from 'electron';
import { Col,Row } from 'react-bootstrap';
//import * as EditorActions from '../actions';

//components
import InputArea from '../components/InputArea';
import PreviewArea from '../components/PreviewArea';
//import Footer from '../components/Footer';

class EditorPage extends Component {
  constructor(props){
    super(props);
    this.state = ({
      markdown: '# This is markdown editor powered by Electron and React-Redux',
//      isShowLeftNav: false,
    });
  }
  componentDidMount(){
    ipcRenderer.on('fileContent',(event,fileData) =>{
      this.updateMarkdown(fileData);
    });
    ipcRenderer.on('saveFile',()=>{
      ipcRenderer.send('contentToSave',this.state.markdown)
    })
  }

  updateMarkdown(md){
    this.setState({markdown:md});
  }
/*
  handleToggleLeftNav(){
      if(tih.state.isShowLeftNav){
        this.setState({isShowLeftNav:false});
      }else{
        this.setState({isShowLeftNav:true});
      }
  }
*/
  render() {
    const {markdown} = this.state;
    const {actions,categoryItems,} = this.props;

    let leftNav = null;
/*
    if(isShowLeftNav){
      leftNav = (
        <LeftNav className="pane-group"
          actions={actions} categoryItems={categoryItems}/>
      )
    }else{leftNav = null;}
*/
//<Footer className="toolbar toolbar-footer" toggleLeftNav={::this.handleToggleNav} />
    return (
      <div className="window">
        <div className="window-content">
          <Row>
            {leftNav}
            <Col md={4}>
              <InputArea {...actions} updateMarkdown={::this.updateMarkdown}
                markdown={markdown} />
            </Col>
            <Col md={8}>
              <PreviewArea markdown={markdown} />
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}
/*
function mapStateToProps(state){
  return {
    categoryItems: state.categoryItems
  }
}

function mapDispatchToProps(dispatch){
  return {actions:bindActionCreators(EditorActions,dispatch)};
}

export default connect(
  mapStateToProps,mapDispatchToProps,
)(EditorPage);
*/
export default EditorPage
