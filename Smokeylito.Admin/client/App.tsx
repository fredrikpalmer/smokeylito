import { hot } from 'react-hot-loader/root'
import * as React from 'react';
import * as actions from './actions/SmokeTestAction';
import { ApplicationState } from '../models/application-state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TargetApplication } from '../models/target-application';

export interface Props {
  targets: TargetApplication[];
  isFetching: boolean;
  dispatch: Dispatch;
}

class App extends React.Component<Props>{
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    actions.fetchSmokeTests();
}

  render(){ 
      return(
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <div className="container">
          <button className="btn btn-primary" data-toggle="modal" data-target=".modal">
            Add target app
          </button>
        </div>

        <div className="modal" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export function mapStateToProps(state: ApplicationState) {
  const { targets } = state || {targets: []};
  return {
    targets: targets || [],
    isFetching: true
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.SmokeTestAction>) {
  return {
    requestSmokeTests: () => dispatch(actions.requestSmokeTests()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(App));