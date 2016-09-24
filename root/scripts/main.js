var self = this;
var myArray=[];
var firebaseRef = new Firebase("https://aconceptaday.firebaseio.com/");
var MainApp = React.createClass({

  getInitialState: function() {
   return {dataList : "", youtubeLink:"", types:"", equations:"", googleLink:""};
 },

 componentWillMount: function() {
   this.getData();
 },

  sendToFirebase: function(){
    this.setState({loaderText:" submitting data---->please wait"});
    var d = new Date();
    firebaseRef.child(this.state.topic).set({topic: this.state.topic, youtubeLink:this.state.youtubeLink , types:this.state.types, equations:this.state.equations, googleForm:this.state.googleLink}, function(error) {
         if (error !== null) {
             alert("Some Error Occured Try Again");
             this.resetForm();
         }else{
             this.setState({showDetails:true});
             this.resetForm();
         }
       }.bind(this));
  },

  resetForm: function(){
    this.setState({topic : "", youtubeLink:"", types:"", equations:"", googleLink:"", showDetails:false});
  },

  getData: function(){
    firebaseRef.orderByChild("topic").on("child_added", function(snapshot) {
      console.log(snapshot.val());
      myArray.push(snapshot.val());
      this.setState({topic:myArray});
    }.bind(this));
  },

  handleSearch: function(topic){
    firebaseRef.orderByChild("topic").equalTo(topic).on("child_added", function(snapshot) {
        var myArra = [];
        myArra.push(snapshot.val());
        this.setState({moreDetails:myArra, showDetails:true});
    }.bind(this));
  },

  handleBack: function(){
    this.setState({showDetails:false});
  },


  handleChange: function(field, e) {
    this.setState({showDetails: false, loaderText:'Enter the above details'});
    if(field==="topic"){
      this.setState({topic: e.target.value});
    }else if(field==="video"){
      this.setState({youtubeLink: e.target.value});
    }else if(field==="types"){
      this.setState({types: e.target.value});
    }else if(field==="equation"){
      this.setState({equations: e.target.value});
    }else if(field==="google"){
      this.setState({googleLink: e.target.value});
    }
  },

  render: function() {
    console.log("array", myArray);
    var tileStyle = {
      marginTop:10
    }

    var singleButton = {
      position: "absolute",
      marginLeft:-850,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20,
    }

    var multipleButton = {
      position: "absolute",
      marginLeft:-550,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20,
    }

    var loaderSize = {
      fontSize: 20,
      color:"white",
    }

    var setPadding = {
      alignItems:"center",
      paddingTop:20,
    }

    var background4={
      backgroundColor:"white"
    }

    var backButton={
      backgroundColor:"#E91E63",
      color:"white",
      fontStyle:"bold"
    }

    if(!this.state.showDetails&&this.state.topic){
      return (
        <div className="row" style={setPadding}>
        <div className="col-md-12">
        <ul className="list-group">
          <a href="#" className="list-group-item active">
            Select Topic
          </a>
          {
             this.state.topic.map((item, index) => {
               return (<li className="list-group-item" onClick={this.handleSearch.bind(this,item.topic)}>{item.topic}</li>);
             })
           }
        </ul>
        </div>
        </div>
      );
    }else if(this.state.showDetails){
      return(
        <div className="row">
        <div className="col-md-12" style={background4}>
        <button type="button" className="btn btn-danger btn-block" onClick={this.handleBack}>Go to Main List</button>
        <ul className="list-group">
          {
             this.state.moreDetails.map((item, index) => {
               return (<Card title={item.topic} equations={item.equations} problemTypes={item.types} youtubeLink={item.youtubeLink} googleLink={item.googleForm}/>);
             })
           }
        </ul>
        </div>
        </div>
      );
    }else{
      return(
        <div className="row">
        <div className="col-md-12 text-center">
          <p style={loaderSize}>Loading Please Wait</p>
        </div>
        </div>
      );
    }
  }
});



var Card = React.createClass({
  render: function() {
    var tileStyle = {
      marginTop:10
    }

    var singleButton = {
      position: "absolute",
      marginLeft:-850,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20,
    }

    var multipleButton = {
      position: "absolute",
      marginLeft:-550,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20,
    }

    var setPadding = {
      paddingTop: 20,
    }

    var background1={
      backgroundColor:"#F5F5F5",
      color:"black"
    }

    var background2={
      backgroundColor:"#009688",
      color:"white"
    }

    var background3={
      backgroundColor:"#FFF59D",
      color:"white"
    }

    return (
		    <div className="col-md-12" style={background1}>
			  <div className="jumbotron" style={background1}>
          <ul className="list-group">
           {this.props.youtubeLink?<VideoCard url={this.props.youtubeLink} title={this.props.title}/>:<div/>}
          </ul>
  				<ul className="list-group">
          <a href="#" className="list-group-item list-group-item-success">
            Equations
          </a>
       {this.props.equations.split("\n").map(i=> {
           return <li className="list-group-item">{i}</li>;
       })}
  				</ul>
          <ul className="list-group">
          <a href="#" className="list-group-item list-group-item-info">
            Problem Types
          </a>
       {this.props.problemTypes.split("\n").map(i=> {
           return <li className="list-group-item">{i}</li>;
       })}
         <button type="button" className="btn btn-default btn-block"><a href={this.props.googleLink}>
           Practise Questions
         </a></button>
  				</ul>
          <h5 className="text-center">Developed and maintained by WaterLabs</h5>
			  </div>
		 </div>
    );
  }
});


var VideoCard = React.createClass({
  render: function() {
    var tileStyle = {
      marginTop:10
    }

    var singleButton = {
      position: "absolute",
      marginLeft:-850,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20,
    }

    var multipleButton = {
      position: "absolute",
      marginLeft:-550,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20,
    }

    var setPadding = {
      alignItems:"center",
      paddingLeft:20,
      paddingTop:20,
      paddingRight: 20,
      paddingBottom: 20,
    }
    var background4={
      backgroundColor:"#FFEB3B"
    }
    return (
        <div className="col-md-12">
          <div className="embed-responsive embed-responsive-4by3">
          <iframe id="video" className="embed-responsive-item" src={this.props.url} allowFullScreen></iframe>
        </div>
        </div>
    );
  }
});




ReactDOM.render(
  <MainApp />,
  document.getElementById('content')
);
