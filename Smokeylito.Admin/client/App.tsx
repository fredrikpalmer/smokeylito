import * as React from 'react';
import * as actions from './actions/GetTargetApplications';
import { ApplicationState } from '../shared/application-state';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { TargetApplication } from '../shared/target-application';

export interface Props {
  targets?: TargetApplication[];
  isFetching?: boolean; 
  requestTargetApplications?: any
}

class App extends React.Component<Props>{
  constructor(props: Props) {
    super(props)
  }

  componentWillMount() {
    this.props.requestTargetApplications();
  }

  componentWillReceiveProps(nextProps: Props) {
    return;
  }

  render(){ 
      return(
      <div>
        <nav className="navbar navbar-light bg-light">
          <a href="/" className="navbar-brand mb-0 h1">Smokeylito Admin</a>
        </nav>
        <div className="container">
          <div className="row" style={{ padding: "20px 0px" }}>
            <div className="col-lg-9">
              <h1 className="page-header">Targetapplications</h1>
            </div>
            <div className="col-lg-3">
              <button className="btn btn-primary pull-right" data-toggle="modal" data-target=".modal">
                Add target
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ApplicationName</th>
                    <th scope="col">BaseUrl</th>
                    <th scope="col">QueryString</th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.targets && this.props.targets.map(x => {
                      return (
                        <tr key={x.applicationName}>
                          <th scope="row">1</th>
                          <td>{x.applicationName}</td>
                          <td>{x.baseUrl}</td>
                          <td>{x.queryString}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
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
  return state.smokeTest;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.SmokeTestAction>) {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);