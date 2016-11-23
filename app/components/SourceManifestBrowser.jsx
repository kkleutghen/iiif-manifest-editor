var React = require('react');
var ReactDOM = require('react-dom');
var OpenSequenceDialog = require('OpenSequenceDialog');
var SourceManifestWindow = require('SourceManifestWindow');

var SourceManifestBrowser = React.createClass({
  getInitialState: function() {
    return {
      sourceManifests: []
    }
  },
  showOpenSequenceDialog: function() {
    var $openSequenceDialog = $(ReactDOM.findDOMNode(this.refs.openSequenceDialog));
    $openSequenceDialog.modal({
      backdrop: 'static'
    });
    $($openSequenceDialog).on('shown.bs.modal', function() {
      $openSequenceDialog.find('input').focus();
    })
  },
  addManifestDataToState: function(manifestData) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // append the manifest to the list of source manifests
    sourceManifests.push(manifestData);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests
    });
  },
  removeManifestFromState: function(manifestIndex) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // remove the manifest from the list of source manifests
    sourceManifests.splice(manifestIndex, 1);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests
    });
  },
  render: function() {
    var _this = this;
    return (
      <div className="source-manifest-browser">
        {
          Object.keys(this.state.sourceManifests).map(function(manifestIndex) {
            var manifestData = _this.state.sourceManifests[manifestIndex];
            return(
              <SourceManifestWindow key={manifestIndex} manifestIndex={manifestIndex} manifestData={manifestData} onRemoveHandler={_this.removeManifestFromState}/>
            );
          })
        }
        <button type="button" className="btn btn-default open-sequence-button" aria-label="Open sequence" onClick={() => this.showOpenSequenceDialog()}>
          <span className="fa fa-plus-circle fa-2x" aria-hidden="true"></span><br />Open Sequence
        </button>
        <OpenSequenceDialog ref="openSequenceDialog" onSuccessHandler={this.addManifestDataToState}/>
      </div>
    );
  }
});

module.exports = SourceManifestBrowser;